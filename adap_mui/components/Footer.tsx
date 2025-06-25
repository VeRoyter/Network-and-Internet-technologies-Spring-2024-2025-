import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

function Footer() {
    return (
        <Box component="footer" sx={{ bgcolor: 'Black', py: 2 }}>
            <Container maxWidth="lg" sx={{ display: 'flex', justifyContent: 'center' }}>
                <Typography variant="body2" color="White" align="center">
                    © 2025г. Матуленко Владимир. Права не защищены.
                </Typography>
            </Container>
        </Box>
    );
}

export default Footer;
