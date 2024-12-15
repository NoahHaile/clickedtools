import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
    Box,
    Typography,
    TextField,
    Button,
    RadioGroup,
    FormControlLabel,
    Radio,
    CircularProgress,
    Alert
} from "@mui/material";
import { fetchLineDetails, addJournalNote } from "../services/api";

const JournalPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [line, setLine] = useState<string>();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [newNote, setNewNote] = useState("");
    const [rating, setRating] = useState<'DOWNER' | 'HYPE'>('HYPE');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchLineDetails(id!);
                if (!data) {
                    navigate("/not_found"); // Redirect if no data is found
                } else {
                    setLine(data.opening);
                }
            } catch (err) {
                setError("Failed to load line details. Please try again.");
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [id, navigate]);

    const handleSave = async () => {
        try {
            await addJournalNote({ id: id!, content: newNote, rating });
            setNewNote("");
            navigate("/journal")
        } catch (err) {
            setError("Failed to save your note. Please try again.");
        }
    };

    if (loading) {
        return (
            <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Box sx={{ padding: 4 }}>
                <Alert severity="error">{error}</Alert>
            </Box>
        );
    }

    return (
        <Box sx={{ padding: 4, maxWidth: "800px", margin: "auto" }}>
            <Typography variant="h4" sx={{ fontStyle: 'italic' }}>
                {line}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 1 }}>
                🥂Here is to hoping it went well. Share your experience anonymously.
            </Typography>

            {/* Add New Note */}
            <Box sx={{ mb: 4 }}>

                <RadioGroup
                    value={rating}
                    onChange={(e) => setRating(e.target.value as "DOWNER" | "HYPE")}
                    row
                    sx={{ mb: 0 }}
                >
                    <FormControlLabel value="DOWNER" control={<Radio />} label="😞 Downer Experience" />
                    <FormControlLabel value="HYPE" control={<Radio />} label="🎉 Hype Experience" />
                </RadioGroup>
                <TextField
                    label="Write it down!"
                    variant="outlined"
                    fullWidth
                    multiline
                    rows={9}
                    value={newNote}
                    onChange={(e) => setNewNote(e.target.value)}
                    sx={{ mb: 2 }}
                />
                <Button
                    variant="contained"
                    onClick={handleSave}
                    disabled={!newNote.trim()}

                >
                    Save Note
                </Button>
            </Box>
        </Box>
    );
};

export default JournalPage;
