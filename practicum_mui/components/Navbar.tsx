import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import MenuItem from '@mui/material/MenuItem';
import React from 'react';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import {styled} from '@mui/material/styles';

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexShrink: 0,
    borderRadius: `calc(${theme.shape.borderRadius}px + 8px)`,
    border: '1px solid',
    borderColor: theme.palette.divider,
    padding: '8px 12px',
 }));

function Navbar() {
    const [open, setOpen] = React.useState(false);
    const toggleDrawer = (newOpen: boolean) => () => {
        setOpen(newOpen);
    };

    return (
        <AppBar
            position="static"
            sx={{
                boxShadow: 0,
                bgcolor: 'transparent',
                mt: '28px',
            }}
        >
        <Container maxWidth="xl">
            <StyledToolbar>
                <Typography variant="h6" sx={{ color: '#5d8aa8' }}>
                Самые высокие здания и сооружения
                </Typography>
                <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                    <Button variant="contained" color="info" size="medium">
                        Главная
                    </Button>
                    <Button color="info" size="medium">
                        Список зданий
                    </Button>
                    <Button color="info" size="medium">
                        Контакты
                    </Button>
                </Box>

                <Box sx={{ display: { xs: 'flex', md: 'none' }}}>
                    <IconButton aria-label="Menu button" onClick={toggleDrawer(true)}>
                        <MenuIcon />
                    </IconButton>

                    <Drawer
                        anchor="top"
                        open={ open }
                        onClose={toggleDrawer(false)}
                    >
                        <Box>
                            <Box
                                sx={{
                                display: 'flex',
                                justifyContent: 'flex-end',
                                }}
                            >
                                <IconButton onClick={toggleDrawer(false)}>
                                <CloseRoundedIcon />
                                </IconButton>
                            </Box>

                            <MenuItem sx={{ backgroundColor: '#0288d1', '&:hover':{backgroundColor: 'lightblue'} }}> Главная </MenuItem>
                            <MenuItem sx={{'&:hover':{backgroundColor: 'lightblue'}}}>Список зданий</MenuItem>
                            <MenuItem sx={{'&:hover':{backgroundColor: 'lightblue'}}}>Контакты</MenuItem>
                        </Box>
                    </Drawer>

                </Box>
            </StyledToolbar>
        </Container>
        </AppBar>
    );
}

export default Navbar;
