import React from 'react';
import { AppBar, Toolbar, IconButton, Typography, Button, useTheme } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import styled from '@emotion/styled';

const StyledAppBar = styled(AppBar)`
  background-color: ${props => props.theme.palette.background.paper};
  z-index: ${props => props.theme.zIndex.drawer + 1};
`;

function Navbar({ onLogout, toggleSidebar, toggleTheme, theme, isSidebarOpen }) {
  const currentTheme = useTheme();

  return (
    <StyledAppBar position="fixed">
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={toggleSidebar}
          style={{ color: currentTheme.palette.text.primary }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" style={{ flexGrow: 1, color: currentTheme.palette.text.primary }}>
          Admin Panel
        </Typography>
        <IconButton
          color="inherit"
          onClick={toggleTheme}
          style={{ color: currentTheme.palette.text.primary }}
        >
          {currentTheme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
        </IconButton>
        <Button color="inherit" onClick={onLogout} style={{ color: currentTheme.palette.text.primary }}>Logout</Button>
      </Toolbar>
    </StyledAppBar>
  );
}

export default Navbar;
