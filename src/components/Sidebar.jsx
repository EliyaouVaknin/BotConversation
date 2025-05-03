import React from 'react';
import { Box, Drawer, List, ListItem, ListItemText, Typography } from '@mui/material';

const drawerWidth = 200;
const headerHeight = 70;

export default function Sidebar({handleBackButton}) {
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
          top: `${headerHeight}px`,
        },
      }}
    >
      <Box sx={{ overflow: 'auto' }}>
        <Typography variant="h6" sx={{ p: 2 }}>Menu</Typography>
      </Box>
    </Drawer>
  );
}
