import React from "react";
import {
  CssBaseline,
  Container,
  Typography,
  AppBar,
  Toolbar,
  Button,
  ThemeProvider,
  Box,
} from "@mui/material";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import JournalPage from "./pages/Journal";
import NotFound from "./pages/NotFound";
import theme from "./theme";
import JournalListPage from "./pages/JournalList";
import JournalView from "./pages/JournalView";

const App: React.FC = () => {

  return (
    <Router basename="/icebreaker/app">
      <ThemeProvider theme={theme}>
        <CssBaseline />

        <AppBar position="static" sx={{ bgcolor: '#0A122A', color: '#fff' }}>
          <Toolbar sx={{ justifyContent: "space-between" }}>
            <Box
              component={Link}
              to="/"
              sx={{
                display: "flex",
                alignItems: "center",
                textDecoration: "none",
                color: "inherit",
              }}
            >
              <Box
                component="img"
                src="/icebreaker/app/logo.png" // Adjust the filename to your image in the public folder
                alt="IceBreaker Logo"
                sx={{
                  width: 60,    // Adjust size as needed
                  height: 60,   // Keep it square for simplicity
                  marginRight: 1, // Space between image and text
                }}
              />

            </Box>

            <Box>
              <Button color="inherit" component={Link} to="/journal" sx={{ marginLeft: 2 }}>
                Posts
              </Button>
            </Box>
          </Toolbar>
        </AppBar>

        <Container
          maxWidth="lg"
          sx={{
            paddingTop: 2,
            paddingBottom: 4,
            minHeight: "80vh",
          }}
        >
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/journal" element={<JournalListPage />} />
            <Route path="/journal/:id" element={<JournalPage />} />
            <Route path="/view/:id" element={<JournalView />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Container>
        <Box
          component="footer"
          sx={{
            textAlign: "center",
            py: 2,
            bgcolor: theme.palette.grey[200],
            mt: 4,
          }}
        >
          <Typography variant="body2" color="textSecondary">
            &copy; 2024 ClickedTools. No Rights Reserved.
          </Typography>
        </Box>
      </ThemeProvider>
    </Router>
  );
};

export default App;
