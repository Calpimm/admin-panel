import React, { useEffect, useState } from 'react';
import { Drawer, List, ListItem, ListItemText, ListItemIcon, IconButton, useTheme } from '@mui/material';
import { Person as PersonIcon, AdminPanelSettings as AdminPanelSettingsIcon, Computer as ComputerIcon, Web as WebIcon, Email as EmailIcon, VpnKey as VpnKeyIcon, ChevronLeft as ChevronLeftIcon } from '@mui/icons-material';
import styled from '@emotion/styled';
import { toast } from 'react-toastify';

const drawerWidth = 240;

const StyledDrawer = styled(Drawer)`
  .MuiDrawer-paper {
    width: ${drawerWidth}px;
    background-color: ${props => props.theme.palette.background.default};
    color: ${props => props.theme.palette.text.primary};
    @media (max-width: 600px) {
      width: 200px; /* Küçük ekranlar için genişlik ayarı */
    }
  }
`;

const StyledListItem = styled(ListItem)`
  &:hover {
    background-color: ${props => props.theme.palette.action.hover};
  }
`;

const DrawerHeader = styled.div`
  display: flex;
  align-items: center;
  padding: ${props => props.theme.spacing(0, 1)};
  justify-content: flex-end;
`;

function Sidebar({ onSelect, isSidebarOpen, toggleSidebar }) {
  const theme = useTheme();
  const [role, setRole] = useState('');

  useEffect(() => {
    const userRole = sessionStorage.getItem('role');
    setRole(userRole);
  }, []);

  const handleSelect = (section) => {
    if (role !== 'admin' && section !== 'players') {
      toast.error('Yetkisiz işlem');
      return;
    }
    onSelect(section);
  };

  return (
    <StyledDrawer
      variant="temporary"
      anchor="left"
      open={isSidebarOpen}
      onClose={toggleSidebar}
      ModalProps={{
        keepMounted: true, // Better open performance on mobile.
      }}
    >
      <DrawerHeader>
        <IconButton onClick={toggleSidebar}>
          <ChevronLeftIcon />
        </IconButton>
      </DrawerHeader>
      <div style={{ marginTop: '26px' }}>
        <List>
          <StyledListItem button onClick={() => handleSelect('players')}>
            <ListItemIcon>
              <PersonIcon style={{ color: theme.palette.text.primary }} />
            </ListItemIcon>
            <ListItemText primary="Players" />
          </StyledListItem>
          <StyledListItem button onClick={() => handleSelect('admins')}>
            <ListItemIcon>
              <AdminPanelSettingsIcon style={{ color: theme.palette.text.primary }} />
            </ListItemIcon>
            <ListItemText primary="Admins" />
          </StyledListItem>
          <StyledListItem button onClick={() => handleSelect('vps')}>
            <ListItemIcon>
              <ComputerIcon style={{ color: theme.palette.text.primary }} />
            </ListItemIcon>
            <ListItemText primary="VPS Server" />
          </StyledListItem>
          <StyledListItem button onClick={() => handleSelect('website')}>
            <ListItemIcon>
              <WebIcon style={{ color: theme.palette.text.primary }} />
            </ListItemIcon>
            <ListItemText primary="Website" />
          </StyledListItem>
          <StyledListItem button onClick={() => handleSelect('mailservice')}>
            <ListItemIcon>
              <EmailIcon style={{ color: theme.palette.text.primary }} />
            </ListItemIcon>
            <ListItemText primary="MailService" />
          </StyledListItem>
          <StyledListItem button onClick={() => handleSelect('apikey')}>
            <ListItemIcon>
              <VpnKeyIcon style={{ color: theme.palette.text.primary }} />
            </ListItemIcon>
            <ListItemText primary="Get API Key" />
          </StyledListItem>
        </List>
      </div>
    </StyledDrawer>
  );
}

export default Sidebar;
