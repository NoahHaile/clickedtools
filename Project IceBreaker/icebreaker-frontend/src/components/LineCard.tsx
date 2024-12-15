import React from "react";
import {
    Card,
    CardContent,
    Typography,
    Box,
    Button,
    Link,
} from "@mui/material";
import { Line } from "../types/Line";
import { CommitmentStatus } from "../types/CommitmentLine";
import { putSuccessfulCommitment } from "../services/api";

interface LineCardProps {
    line: Line;
    locked: boolean;
    status?: CommitmentStatus
    commitmentId?: number
    fetchData?: () => void
}

const LineCard: React.FC<LineCardProps> = ({ line, locked, status, commitmentId, fetchData }) => {
    const extractYouTubeEmbedUrl = (url: string) => {
        const videoIdMatch = url.match(/(?:https?:\/\/)?(?:www\.)?youtu(?:\.be\/|be\.com\/(?:watch\?v=|embed\/))([\w-]{11})/);
        return videoIdMatch ? `https://www.youtube.com/embed/${videoIdMatch[1]}` : "";
    };

    const videoEmbedUrl = extractYouTubeEmbedUrl(line.demonstrationUrl);

    return (
        <Card
            sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                boxShadow: 3,
                borderRadius: 2,
                overflow: "hidden",
                transition: "transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
                "&:hover": {
                    transform: "scale(1.02)",
                    boxShadow: 6,
                },
            }}
        >
            <CardContent sx={{ pb: 2 }}>
                <Typography
                    variant="h6"
                    sx={{ fontStyle: "italic", lineHeight: 1.2, mb: 2 }}
                >
                    {line.opening}
                </Typography>

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

                <Box
                    sx={{
                        p: 1,
                        border: "1px solid #eee",
                        borderRadius: 1,
                        backgroundColor: "#f9f9f9",
                        mb: 2,
                    }}
                >
                    <Typography
                        variant="body2"
                        color="textSecondary"
                        sx={{ mb: 1 }}
                    >
                        Best Used: {line.bestUsed}
                    </Typography>
                    <Link
                        href={line.demonstrationUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        sx={{ color: "primary.main", textDecoration: "none" }}
                    >
                        Open on YouTube
                    </Link>
                </Box>
            </CardContent>

            {locked && (
                <Box sx={{ display: "flex", flexDirection: "column", gap: 1, p: 2 }}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={async () => { 
                            await putSuccessfulCommitment(commitmentId!);
                            fetchData!();
                        }}
                        disabled={status == 'COMPLETED'}
                    >
                        {status === 'COMPLETED' ? "Completed" : "Mark as Done"}
                    </Button>
                    <Button variant="outlined" color="secondary" href={`/journal/${line.id}`}>
                        Go to Journal
                    </Button>
                </Box>
            )}
        </Card>
    );
};

export default LineCard;
