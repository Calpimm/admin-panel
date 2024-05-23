import React from 'react';
import { Drawer, List, ListItem, ListItemText } from '@mui/material';

function Sidebar({ onSelect, isSidebarOpen }) {
  return (
    <Drawer
      variant="persistent"
      anchor="left"
      open={isSidebarOpen}
      style={{ marginTop: '64px' }}
    >
      <div style={{ marginTop: '64px' }}> {/* Bu div eklenerek butonlar daha aşağı alınacak */}
        <List>
          <ListItem button onClick={() => onSelect('players')}>
            <ListItemText primary="Players" />
          </ListItem>
          <ListItem button onClick={() => onSelect('admins')}>
            <ListItemText primary="Admins" />
          </ListItem>
          <ListItem button onClick={() => onSelect('vps')}>
            <ListItemText primary="VPS Server" />
          </ListItem>
          <ListItem button onClick={() => onSelect('website')}>
            <ListItemText primary="Website" />
          </ListItem>
          <ListItem button onClick={() => onSelect('mailservice')}>
            <ListItemText primary="MailService" />
          </ListItem>
          <ListItem button onClick={() => onSelect('apikey')}>
            <ListItemText primary="Get API Key" />
          </ListItem>
        </List>
      </div>
    </Drawer>
  );
}

export default Sidebar;
