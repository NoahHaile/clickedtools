import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Box, Typography, IconButton, CircularProgress, Paper } from "@mui/material";
import { Journal } from "../types/Journal";
import { fetchJournal, fetchLineWithId, fetchLineWithOpening, postLikeForJournal } from "../services/api";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

const JournalView: React.FC = () => {

    const { id } = useParams<{ id: string }>();
    const [journal, setJournal] = useState<Journal>();
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>();
    const [videoEmbedUrl, setVideoEmbedUrl] = useState<string>();
    const [buttonLoading, setButtonLoading] = useState<{ [key: string]: boolean }>({});

    const navigate = useNavigate();

    // Fetch the Journal data
    useEffect(() => {
        const fetch = async () => {
            try {
                const data = await fetchJournal(id!);
                setJournal(data);
                console.log(data)
                const lineData = await fetchLineWithOpening(data.opening);
                setVideoEmbedUrl(extractYouTubeEmbedUrl(lineData.demonstrationUrl));
            } catch {
                setError("Unable to fetch journal post. Please try again later.");
            }
            setLoading(false);
        };
        if (id) {
            fetch();
        } else {
            navigate("/not-found");
        }
    }, [id]);

    const handleLike = async (entry: Journal) => {
        setButtonLoading((prev) => ({ ...prev, [entry.id]: true }));
        try {
            await postLikeForJournal(entry.id);
            entry.likes++;
            entry.isLiked = true;
        } catch {
            setError("Failed to like the journal entry. Please try again.");
        } finally {
            setButtonLoading((prev) => ({ ...prev, [entry.id]: false }));
        }
    };

    const extractYouTubeEmbedUrl = (url: string) => {
        const videoIdMatch = url.match(/(?:https?:\/\/)?(?:www\.)?youtu(?:\.be\/|be\.com\/(?:watch\?v=|embed\/))([\w-]{11})/);
        return videoIdMatch ? `https://www.youtube.com/embed/${videoIdMatch[1]}` : "";
    };

    const formatLikes = (num: number) => {
        return num >= 1000 ? `${(num / 1000).toFixed(1)}K` : num.toString();
    };

    if (loading) {
        return (
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Box sx={{ padding: 4 }}>
                <Typography variant="h6" color="error">
                    {error}
                </Typography>
            </Box>
        );
    }

    return (
        <Box sx={{ padding: 2 }}>
            <Box sx={{ mx: 'auto', maxWidth: '500px' }}>
                {videoEmbedUrl && (
                    <Box
                        sx={{
                            position: "relative",
                            pb: "56.25%", // 16:9 aspect ratio
                            height: 0,
                            mb: 2,
                            borderRadius: 1,
                            overflow: "hidden",
                        }}
                    >
                        <iframe
                            src={videoEmbedUrl}
                            title="Demonstration Video"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            style={{
                                position: "absolute",
                                top: 0,
                                left: 0,
                                width: "100%",
                                height: "100%",
                            }}
                        ></iframe>
                    </Box>
                )}
            </Box>
            <Paper
                elevation={0}
                sx={{
                    display: "flex",
                    flexDirection: "row",
                    padding: 2,
                    backgroundColor: "white",
                    gap: 2,
                    borderRadius: 0,
                    border: "1px solid #ddd",
                }}
            >
                {/* Voting Section */}
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "flex-start",
                        padding: 1,
                        minWidth: "60px",
                    }}
                >
                    {journal &&
                        <IconButton
                            size="small"
                            disabled={buttonLoading[journal.id] || journal.isLiked}
                            onClick={() => handleLike(journal)}
                            sx={{ padding: 1 }}
                        >
                            {journal.isLiked ? (
                                <FavoriteIcon color="primary" />
                            ) : buttonLoading[journal.id] ? (
                                <CircularProgress size={20} />
                            ) : (
                                <FavoriteBorderIcon />
                            )}
                        </IconButton>
                    }
                    <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ fontWeight: "bold", fontSize: "0.9rem" }}
                    >
                        {journal?.likes ? formatLikes(journal.likes) : "0"}
                    </Typography>
                </Box>

                {/* Content Section */}
                <Box sx={{ flex: 1 }}>
                    {/* Title */}
                    <Typography
                        variant="h6"
                        component="h2"
                        sx={{ fontWeight: "bold", marginBottom: 1 }}
                    >
                        {journal?.opening}
                    </Typography>

                    {/* Body */}
                    <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ marginBottom: 2 }}
                    >
                        {journal?.content}
                    </Typography>

                    {/* Tags */}
                    <Typography
                        variant="caption"
                        sx={{
                            display: "inline-block",
                            backgroundColor: "#f0f0f0",
                            padding: "2px 8px",
                            borderRadius: "4px",
                            color: "#555",
                        }}
                    >
                        {journal?.rating}
                    </Typography>
                </Box>
            </Paper>
        </Box>
    );
};

export default JournalView;
