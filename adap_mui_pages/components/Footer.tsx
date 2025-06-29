import React from 'react';
import Box  from '@mui/material/Box';
import Container  from '@mui/material/Container';
import Typography  from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Grid  from '@mui/material/Grid';
import AppBar from '@mui/material/AppBar';
import ToolBar from '@mui/material/Toolbar';

function Footer() {
    return (
        <AppBar
        position="static"
        sx={{
            boxShadow: 0,
            bgcolor: 'Black', 
            mt: '35px',      
            py: 0.01,           
          }}
        >
          <Typography variant="body1" color="white"
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height:'45px'
        }}
          >
            2025г.  Матуленко В. А. Права не защищены.
          </Typography>
        </AppBar>
    );
  };
  
  export default Footer;