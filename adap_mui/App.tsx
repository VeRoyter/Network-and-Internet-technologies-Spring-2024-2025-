// src/App.tsx

import React from 'react';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import Navbar from './components/Navbar';
import Content from './components/Content';
import Gallery from './components/Gallery';
import Footer from './components/Footer';

const lightTheme = createTheme({
    palette: {
        mode: 'light',
        background: {
            default: '#f7f7f7', // Слегка серый фон, чтобы белые элементы выделялись
        },
    },
});

function App() {
    return (
        <ThemeProvider theme={lightTheme}>
            {/* <CssBaseline /> */}
            <Navbar />
            <Gallery />
            <Content />
            <Footer />
        </ThemeProvider>
    );
}

export default App;
