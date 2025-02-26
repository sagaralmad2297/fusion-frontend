import React from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';

const Sidebar = ({ open, onClose }) => {
  const categories = ['Men', 'Women', 'Kids', 'Unisex'];

  return (
    <Drawer anchor="left" open={open} onClose={onClose}>
      <List sx={{ width: 250 }}>
        {categories.map((category) => (
          <ListItem button key={category}>
            <ListItemText primary={category} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;