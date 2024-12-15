import { useState, useEffect } from 'react';
import { Box, Button, Typography, CircularProgress, Alert, Skeleton } from '@mui/material';
import LineCard from '../components/LineCard';
import { fetchLines, lockLines, fetchLockedLines, putCommitmentFailure } from '../services/api';
import { Line } from '../types/Line';
import DailyTimeline from '../components/DailyTimeline';
import { Commitments } from '../types/Commitments';

const Dashboard = () => {
    const [lines, setLines] = useState<Line[]>([]);
    const [lockedLines, setLockedLines] = useState<Commitments>();
    const [loading, setLoading] = useState<boolean>(true);
    const [locked, setLocked] = useState<boolean>(false);
    const [timeLeft, setTimeLeft] = useState<number>(0);
    const [error, setError] = useState<string>('');
    const [locking, setLocking] = useState<boolean>(false);
    const [shuffling, setShuffling] = useState<boolean>(false);

    const fetchData = async () => {
        try {
            setLoading(true);
            const lockedLinesData = await fetchLockedLines().catch(() => null);
            if (lockedLinesData) {
                setLocked(true);
                setLockedLines(lockedLinesData);
                setTime(lockedLinesData.expiry);
            } else {
                setLocked(false);
                const linesData = await fetchLines();
                setLines(linesData);
            }
        } catch (error) {
            setError('There was an error fetching the data. Please try again later.');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const setTime = async (expiry: number) => {
        try {
            setTimeLeft(Math.floor(expiry / 1000) - Math.floor(Date.now() / 1000));
            const timer = setInterval(() => {
                setTimeLeft((prevTime) => {
                    if (prevTime > 0) return prevTime - 1;
                    clearInterval(timer);
                    fetchData();
                    return 0;
                });
            }, 1000);
        } catch (error) {
            setError('There was an error fetching the expiry time. Please try again later.');
            console.error(error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleLockLines = async () => {
        setLocking(true);
        try {
            await lockLines(lines.map((l) => l.id));
            fetchData();
        } catch (error) {
            setError('There was an error locking the lines. Please try again later.');
        } finally {
            setLocking(false);
        }
    };

    const handleShuffleLines = async () => {
        setShuffling(true);
        try {
            const linesData = await fetchLines();
            setLines(linesData);
        } catch (error) {
            setError('There was an error shuffling the lines. Please try again later.');
        } finally {
            setShuffling(false);
        }
    };

    const handleCommitmentFailure = async () => {
        try {
            await putCommitmentFailure();
            fetchData();
        } catch (error) {
            setError('There was an error giving up the commitment. Please try again later.');
        }
    }

    const formatTime = (timeInSeconds: number) => {
        const hours = Math.floor(timeInSeconds / 3600);
        const minutes = Math.floor((timeInSeconds % 3600) / 60);
        const seconds = timeInSeconds % 60;

        return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    };

    return (
        <Box sx={{ px: { xs: 2, sm: 3 }, py: { xs: 1, sm: 2 } }}>
            <Typography variant="h4" color="primary" gutterBottom sx={{ textAlign: 'center' }}>
                IceBreaker
            </Typography>
            <Typography
                variant="body1"
                color="textSecondary"
                sx={{
                    mb: locked ? 1 : 3,
                    textAlign: 'center',
                    maxWidth: { xs: '100%', sm: '500px' },
                    mx: 'auto',
                    wordWrap: 'break-word',
                }}
            >
                Find a reason to step out of your comfort zone and write about the experience to help others along the way.
            </Typography>
            {error && (
                <Box sx={{ mb: 2 }}>
                    <Alert severity="error">{error}</Alert>
                    <Button onClick={fetchData} variant="contained" color="primary" sx={{ mt: 2 }}>
                        Retry
                    </Button>
                </Box>
            )}
            {loading ? (
                <Box sx={{ mt: 3, display: 'flex', flexWrap: 'wrap', gap: 2, justifyContent: 'center' }}>
                    {[...Array(3)].map((_, index) => (
                        <Skeleton key={index} variant="rounded" width={330} height={300} />
                    ))}
                </Box>
            ) : (
                <>
                    {locked && timeLeft > 0 && (
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
                            <Box sx={{ position: 'relative', width: 180, height: 180 }}>
                                {/* Circular Progress for time left */}
                                <CircularProgress
                                    variant="determinate"
                                    value={(timeLeft / (24 * 60 * 60 * 2)) * 100} // 24 hours in seconds = 24 * 60 * 60
                                    size={180}
                                    thickness={4}
                                    sx={{
                                        color: timeLeft > 0 ? 'primary.main' : 'error.main',
                                        animation: 'rotate 1s linear infinite', // Make the progress spin smoothly
                                    }}
                                />
                                {/* Overlay text to show the time left */}
                                <Box
                                    sx={{
                                        position: 'absolute',
                                        top: '50%',
                                        left: '50%',
                                        transform: 'translate(-50%, -50%)',
                                        textAlign: 'center',
                                    }}
                                >
                                    <Typography variant="h6" color="primary">
                                        Expiry Time
                                    </Typography>
                                    <Typography variant="h4" color="textSecondary">
                                        {formatTime(timeLeft)}
                                    </Typography>
                                </Box>
                            </Box>
                        </Box>
                    )}
                    <Box sx={{ mb: 1, textAlign: 'center' }}>
                        {locked ? (
                            <>
                                <Typography variant="body2" sx={{ fontStyle: 'italic', color: 'textSecondary' }}>
                                    You've locked in today's challenges. Good luck!
                                </Typography>
                                <Button
                                    variant="outlined"
                                    onClick={handleCommitmentFailure}
                                    sx={{ mt: 1, mb: 2, display: 'block', mx: 'auto' }}
                                >
                                    Give Up Commitments
                                </Button>
                            </>
                        ) : (
                            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2, justifyContent: 'center' }}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={handleShuffleLines}
                                    disabled={locked || shuffling}
                                >
                                    {shuffling ? 'Shuffling...' : 'Shuffle'}
                                </Button>
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    onClick={handleLockLines}
                                    disabled={locked || locking}
                                >
                                    {locking ? 'Locking...' : 'Lock'}
                                </Button>
                            </Box>
                        )}
                    </Box>
                    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr' }, gap: 2 }}>
                        {!locked && lines.map((line) => (
                            <LineCard key={line.id} line={line} locked={locked} />
                        ))}
                        {locked && lockedLines?.commitment.map((l) => (
                            <LineCard key={l.line.id} line={l.line} locked={locked} status={l.status} commitmentId={l.id} fetchData={fetchData} />
                        ))}
                    </Box>
                    

                </>
            )}

            <Box sx={{ mt: 3 }}>
                <Typography variant="h4" color="primary" sx={{ textAlign: 'center' }}>
                    How to Use IceBreaker
                </Typography>
                <Typography variant="body1" color="textSecondary" sx={{ textAlign: 'center' }}>
                    View the suggested opening lines for the day. <br />
                    Shuffle lines until you are satisfied with the options. <br />
                    Lock your selection for the day and commit to the challenge. <br />
                    Record your experiences and mark down completed tasks. Share what you have to say. <br />
                    Pile up your achievements on the timeline below!
                </Typography>
            </Box>
            <DailyTimeline />
        </Box>
    );
};

export default Dashboard;
