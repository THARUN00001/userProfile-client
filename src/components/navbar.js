import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';


import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';

import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import SessionBinIcon from '@mui/icons-material/Task';
import PracticeIcon from '@mui/icons-material/DriveFileRenameOutline';
import LogoutIcon from '@mui/icons-material/Logout';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import FilterHdrIcon from '@mui/icons-material/FilterHdr';
import { flex } from '@mui/system';


const drawerWidth = "100%";
// const navItems = ["login", "login"];

function Navbar(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [open, setOpen] = React.useState(false);


  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };


  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };


  const icon = [<InboxIcon /> , <SessionBinIcon /> ,<PracticeIcon/>, <LogoutIcon/>]

  const DrawerList = (
    <Box sx={{ width: 250, backgroundColor: 'black', color: 'white', height:"100%", pt:7  }} role="presentation" onClick={toggleDrawer(false)}>
 {/* <Box>
  <FilterHdrIcon sx={{mt:1}}/> <span>Examie</span>
 </Box> */}
      <List>
        {['Inbox',  'Session Bins','Practice'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon sx={{color: 'white'}}>
                {icon[index]  }
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
         <ListItem key={"4"} disablePadding>
            <ListItemButton onClick={()=>{
             localStorage.removeItem("token");//  delete a token in localstorage by replacing the actual token with an enpty string
            }} >
              <ListItemIcon sx={{color: 'white'}}>
                <LogoutIcon/>
              </ListItemIcon>
              <ListItemText primary={"Logout"} />
            </ListItemButton>
          </ListItem>
      </List>
      <Divider />
    </Box>
  );





  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ padding: "0" }}>
  
      <Divider />
    </Box>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (

    <Box sx={{ display: 'flex'}}>

      <CssBaseline />
      <AppBar component="nav" sx={{ backgroundColor: "black"}}>
        <Toolbar sx={{ 
        flexDirection: 'row',justifyContent: 'space-between' , margin: 0
         }}>
          <div sx={{ padding: 0 }}>
            <Button sx={{ color: 'white' }} onClick={toggleDrawer(true)}><MenuIcon /></Button>
            <Drawer open={open} onClose={toggleDrawer(false)}>
              {DrawerList}
            </Drawer>
          </div>
          <Typography
            variant="h6"
            component="div"
            sx={{  display: { xs: 'block', sm: 'block' }, pr:1 }}
          >
            Examie
          </Typography>

        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
      </nav>

    </Box>
  );
}

Navbar.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default Navbar;
