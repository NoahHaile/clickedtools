import React, { useEffect, useState } from "react";
import {
    Box,
    Typography,
    Card,
    CardContent,
    Chip,
    Button,
    Skeleton,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useNavigate } from "react-router-dom";
import { fetchPersonalJournalList, fetchPopularJournalList } from "../services/api";
import { Journal } from "../types/Journal";

const JournalListPage: React.FC = () => {
    const [journalList, setJournalList] = useState<Journal[]>([]);
    const [peopleJournalList, setPeopleJournalList] = useState<Journal[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [buttonLoading, setButtonLoading] = useState<{ [key: string]: boolean }>({});
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [personalData, popularData] = await Promise.all([
                    fetchPersonalJournalList(),
                    fetchPopularJournalList(),
                ]);
                setJournalList(personalData);
                setPeopleJournalList(popularData);
            } catch (err) {
                setError("Failed to load journal lists. Please try again.");
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const shuffleList = async (type: "personal" | "popular") => {
        setButtonLoading((prev) => ({ ...prev, [type]: true }));
        try {
            const newData =
                type === "personal"
                    ? await fetchPersonalJournalList()
                    : await fetchPopularJournalList();
            if (type === "personal") setJournalList(newData);
            else setPeopleJournalList(newData);
        } catch {
            setError("Failed to shuffle the journal list. Please try again.");
        } finally {
            setButtonLoading((prev) => ({ ...prev, [type]: false }));
        }
    };
    const formatLikes = (num: number) => {
        return num >= 1000 ? `${(num / 1000).toFixed(1)}K` : num.toString();
    };

    const getChipColor = (rating: "😞 Downer" | "🎉 Hype") =>
        rating === "🎉 Hype" ? "success" : "warning";

    const renderEntries = (entries: Journal[]) => (
        <Box sx={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: 3,
            padding: 2
        }}>
            {entries.map((entry) => (
                <Card
                    key={entry.id}
                    sx={{
                        cursor: "pointer",
                        borderRadius: 3,
                        boxShadow: 3,
                        transition: "transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
                        "&:hover": {
                            transform: "scale(1.03)",
                            boxShadow: 6,
                        },
                        overflow: "hidden",
                    }}
                    onClick={() => navigate(`/view/${entry.id}`)}
                >
                    <CardContent sx={{ padding: 3 }}>
                        {/* Header with Title */}
                        <Typography
                            variant="h6"
                            gutterBottom
                            sx={{
                                fontWeight: "bold",
                                fontSize: "1.2rem",
                                textTransform: "capitalize",
                                color: "primary.main",
                                mb: 1,
                            }}
                        >
                            {entry.opening}
                        </Typography>

                        {/* Content Preview */}
                        <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{ lineHeight: 1.6 }}
                        >
                            {entry.content.length > 50
                                ? `${entry.content.substring(0, 50)}...`
                                : entry.content}
                        </Typography>

                        {/* Footer with Rating and Likes */}
                        <Box
                            mt={3}
                            sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                            }}
                        >
                            {/* Rating Badge */}
                            <Chip
                                label={entry.rating}
                                color={getChipColor(entry.rating)}
                                sx={{
                                    fontWeight: "bold",
                                    background: getChipColor(entry.rating) === "success"
                                        ? "linear-gradient(45deg, #6bcf63, #3ea94b)"
                                        : "linear-gradient(45deg, #ffc107, #ff9800)",
                                    color: "#fff",
                                    px: 1.5,
                                    fontSize: "0.9rem",
                                }}
                            />

                            {/* Like Section */}
                            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                                <FavoriteIcon color="primary" />
                                <Typography variant="body2" fontWeight="medium">
                                    {formatLikes(entry.likes)}
                                </Typography>
                            </Box>
                        </Box>
                    </CardContent>
                </Card>
            ))}
        </Box>
    );


    return (
        <Box sx={{ padding: { xs: 2, sm: 4 }, backgroundColor: '#f5f5f5' }}>
            {loading ? (
                <Box sx={{ mt: 6 }}>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                        <Skeleton variant="rounded" width="100%" height={200} />
                        <Skeleton variant="rounded" width="100%" height={200} />
                    </Box>
                </Box>
            ) : error ? (
                <Typography color="error" align="center">{error}</Typography>
            ) : (
                <>
                    {/* Popular Entries */}
                    <Box mb={6}>
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                mb: 2,
                            }}
                        >
                            <Typography variant="h5" color="primary" sx={{ fontWeight: 'bold' }}>Popular Entries</Typography>
                            <Button
                                variant="contained"
                                color="primary"
                                disabled={buttonLoading["popular"]}
                                onClick={() => shuffleList("popular")}
                                sx={{ borderRadius: 5 }}
                            >
                                {buttonLoading["popular"] ? "Shuffling..." : "Shuffle"}
                            </Button>
                        </Box>
                        {renderEntries(peopleJournalList)}
                    </Box>

                    {/* Personal Entries */}
                    <Box>
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                mb: 2,
                            }}
                        >
                            <Typography variant="h5" color="primary" sx={{ fontWeight: 'bold' }}>Personal Entries</Typography>
                            <Button
                                variant="contained"
                                color="primary"
                                disabled={buttonLoading["personal"]}
                                onClick={() => shuffleList("personal")}
                                sx={{ borderRadius: 5 }}
                            >
                                {buttonLoading["personal"] ? "Shuffling..." : "Shuffle"}
                            </Button>
                        </Box>
                        {renderEntries(journalList)}
                    </Box>
                </>
            )}
        </Box>
    );
};

export default JournalListPage;