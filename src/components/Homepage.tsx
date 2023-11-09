import React from 'react';
import { AppBar, Toolbar, Drawer, List, ListItem, ListItemIcon, ListItemText, Typography, Box, TextField, Button, useTheme, useMediaQuery } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';

const drawerWidth = 200;

const DashboardPage: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // State to manage which tool is selected and whether the drawer is open on mobile
  const [selectedTool, setSelectedTool] = React.useState<string>('tool1');
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <Toolbar />
      <List>
        {['Tool 1', 'Tool 2', 'Tool 3'].map((text, index) => (
          <ListItem button key={text} onClick={() => setSelectedTool(text)}>
            <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar position="fixed">
        <Toolbar>
          {isMobile && (
            <MenuIcon
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={handleDrawerToggle}
            />
          )}
          <Typography variant="h6" noWrap component="div">
            Dashboard
          </Typography>
        </Toolbar>
      </AppBar>

      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      >
        <Drawer
          variant={isMobile ? 'temporary' : 'permanent'}
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
      </Box>

      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        {/* Render the selected tool's content here */}
        <Typography paragraph>
          Content for {selectedTool}
        </Typography>
      </Box>

      <Box component="footer" sx={{ width: '100%', position: 'fixed', bottom: 0, left: 0, right: 0 }}>
        <TextField label="Input" variant="outlined" fullWidth />
        <Button variant="contained">Submit</Button>
      </Box>
    </Box>
  );
};

export default DashboardPage;
