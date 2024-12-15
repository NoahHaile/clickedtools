import React, { useEffect, useState } from 'react';
import { Typography, Box } from '@mui/material';
import axios from 'axios';

const MotivationalQuote: React.FC = () => {
    const [quote, setQuote] = useState<string>();
    const [author, setAuthor] = useState<string>();

    const fetchRandomQuote = async () => {
        try {
            const response = await axios.get('http://api.quotable.io/random', {
                params: { maxLength: 100, tags: 'inspirational' },
            });
            setQuote(response.data.content);
            setAuthor(response.data.author);
        } catch (error) {
            console.error('Error fetching quote:', error);
        }
    };

    useEffect(() => {
        fetchRandomQuote();
    }, []);

    return (
        <Box
            sx={{
                padding: 3,
                borderRadius: 1,
                
                marginBottom: 4,
                maxWidth: '400px',
                margin: 'auto',
            }}
        >
            <Typography
                variant="h6"
                sx={{
                    textAlign: 'center',
                    fontStyle: 'italic',
                    lineHeight: 1.5,
                    marginBottom: 1,
                    fontWeight: 500,
                }}
            >
                "{quote}"
            </Typography>
            <Typography
                variant="subtitle1"
                sx={{
                    textAlign: 'right',
                    fontWeight: 'bold',
                }}
            >
                ~ {author}
            </Typography>
        </Box>
    );
};

export default MotivationalQuote;
