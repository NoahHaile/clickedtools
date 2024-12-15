import React, { useEffect, useState } from 'react';
import { CircularProgress, Typography, Box } from '@mui/material';
import { Interaction } from '../types/History';
import { fetchTimeline } from '../services/api';

const DailyTimeline: React.FC = () => {
    const [timeline, setTimeline] = useState<Interaction[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const fetchData = async () => {
        try {
            const timelineData = await fetchTimeline();
            setTimeline(timelineData);
        } catch (error) {
            setError('There was an error fetching your timeline. Please try again later.');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const getColorIntensity = (count: number) => {
        const intensity = Math.min(count * 20, 255); // Scale count to color intensity
        return `rgb(${intensity}, ${255 - intensity}, ${100})`; // Green-based gradient
    };

    const generateTimelineBoxes = () => {
        const boxes = [];
        const today = new Date();

        // Generate boxes for the last 90 days
        for (let i = 0; i < 90; i++) {
            const date = new Date();
            date.setDate(today.getDate() - i); // Subtract days from today
            const dateString = date.toISOString().split('T')[0]; // Format as YYYY-MM-DD

            const interaction = timeline.find(item => item.date === dateString);
            const count = interaction ? interaction.count : 0;
            const boxColor = count > 0 ? getColorIntensity(count) : '#E0E0E0'; // Gray if no interaction

            boxes.push(
                <Box
                    key={i}
                    sx={{
                        width: '18px',
                        height: '18px',
                        backgroundColor: boxColor,
                        margin: '2px',
                        borderRadius: '4px',
                        transition: 'transform 0.2s, box-shadow 0.2s',
                        '&:hover': {
                            transform: 'scale(1.2)',
                            boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
                            cursor: 'pointer',
                        },
                    }}
                    title={`Date: ${dateString}\nBattles Fought: ${count}`}
                />
            );
        }

        if (timeline.length === 0) {
            return <Typography color="textSecondary">Make a commitment and see what happens!</Typography>
        }
        return boxes;
    };

    return (
        <Box
            className="timeline"
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                margin: 'auto',
                px: 4,
                marginTop: 5,
                bgcolor: 'background.paper',
                borderRadius: 2,
                boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
                padding: 4,
                maxWidth: 600,

            }}
        >
            {loading ? (
                <CircularProgress />
            ) : error ? (
                <Typography
                    color="error"
                    variant="h6"
                    sx={{ textAlign: 'center', marginTop: 2 }}
                >
                    {error}
                </Typography>
            ) : (
                <>
                    <Typography
                        variant="h6"
                        sx={{
                            marginBottom: 1,
                            textAlign: 'center',

                        }}
                    >
                        🎖️ Honoured Commitments (Last 90 Days) 🎖️
                    </Typography>
                    <Box
                        className="timeline-container"
                        sx={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            justifyContent: 'flex-start',
                        }}
                    >
                        {generateTimelineBoxes()}
                    </Box>
                </>
            )}
        </Box>
    );
};

export default DailyTimeline;
