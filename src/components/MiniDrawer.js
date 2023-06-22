import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Button from '@mui/material/Button';
import DashboardIcon from '@mui/icons-material/Dashboard';
import Tooltip from '@mui/material/Tooltip';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import LeakAddIcon from '@mui/icons-material/LeakAdd';
import HomeIcon from '@mui/icons-material/Home';
import DevicesIcon from '@mui/icons-material/Devices';
import { useLocation } from 'react-router-dom';
import { useData } from '../Context/context';
import { useState } from 'react';
import { useAuth } from '../Context/AuthContext';
import GroupIcon from '@mui/icons-material/Group';
import BugReportIcon from '@mui/icons-material/BugReport';
import { useTenant } from '../Context/TenantContext';
import BrowseGalleryIcon from '@mui/icons-material/BrowseGallery';


const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

const musteri_pages = ['Ana Sayfa','Cihazlar','Gösterge Panelleri'];
const settings = ['Logout'];
const pages= ['Gösterge Panelleri'];
const musteri_icons=[<HomeIcon />,<DevicesIcon/>,<DashboardIcon/>];
const tenant_icons=[<HomeIcon/>,<GroupIcon/>,<DevicesIcon/>,<DashboardIcon/>];
const tenant_pages=['Ana Sayfa','Müşteriler','Cihazlar','Gösterge Panelleri'];
const musteri_paths=['/','/cihazlar','/gostergeler'];
const tenant_paths=['/tenant','/tenant/musteriler','/tenant/cihazlar','/tenant/gostergeler'];

const admin_paths=['/admin','/admin/GostergeKutuphanesi'];
const admin_pages=['Ana Sayfa','Gösterge Kütüphanesi'];
const admin_icons=[<HomeIcon/>,<BrowseGalleryIcon/>];

let sayfalar=[];
let icons=[];
let paths=[];

export default function MiniDrawer() {

  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const {setUser,setType}=useAuth();
  const handleLogout= ()=>{
    
    setUser(false);
    setType(false);
  }

 // const {name,kullanici}=useData();
// const {name}=useTenant();
  const {user,type}=useAuth();
  

  const location=useLocation();
  console.log(location);

  const switchPage=(key)=> {
    let url=key.split("/");
    let sayfa=url[url.length-1];
    if(key==='/'){
      sayfa='/';
    }

    switch(sayfa){
      case 'tenant':
        return 'ANA SAYFA';
      case 'musteriler':
        return "Kullanıcılar";
      case 'gostergeler':
        return 'GÖSTERGE PANELLERİ';
      case 'cihazlar':
        return 'CİHAZLAR';
      case '/':
        return 'ANA SAYFA';
      case 'admin':
        return 'ANA SAYFA';
      case 'GostergeKutuphanesi':
        return "Gösterge Kütüphanesi";

   //   case `/gostergeler/${name}`:
   //     return `GÖSTERGE PANALLERİ > ${name}` ;
      default:
        break;       
    
  }
  }
  
  if(type==='tenant'){
    sayfalar=tenant_pages;
    icons=tenant_icons;
    paths=tenant_paths;
  }
  else if(type==='admin'){
    sayfalar=admin_pages;
    icons=admin_icons;
    paths=admin_paths;
  }
  else{
    sayfalar=musteri_pages;
    icons=musteri_icons;
    paths=musteri_paths;
  }
  return (
    
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}
      sx={{background:"#708090"}}
      >
        <Toolbar>
        <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: 'none' }),
            }}
          >
            <LeakAddIcon sx={{fontSize:30}} />
          </IconButton>
          <Typography 
          variant="h6"
          noWrap
          component="a"
          href="/"
          sx={{
            mr: 5,
            display: { xs: 'none', md: 'flex' },
            fontFamily: 'monospace',
            fontWeight: 700,
            letterSpacing: '.3rem',
            color: 'inherit',
            textDecoration: 'none',
          }}
          >
            IOTMON
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex',borderLeft:'1px solid #596673',paddingLeft:'7px' } }}>
            {pages.map((page) => (
              <Button
                key={page}
                sx={{ my: 2, color: 'white', display: 'block' }}
                href={location.pathname}
              >
                { switchPage(location.pathname)}
              </Button>
            ))}
          </Box>
          
          <Typography
          component="div"
          sx={{
            display:{xs:'none',md:'block'},
            mr:4
          }}
          >
            <Typography
              component="span"
              sx={
              {
              display: {xs:'none',md:'flex'},

              }}
            >
            {user.username || user.email}
            </Typography> 
            <Typography
              component="span"
              sx={
              {
              display: {xs:'none',md:'flex'}
              }}
            >
             {type.charAt(0).toUpperCase() + type.slice(1)}
            </Typography> 
          </Typography>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={setting==="Logout" ? handleLogout : handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open} >
        <DrawerHeader >
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
           { 
           
           sayfalar.map((text, index) => (
            <ListItem key={text} disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
                href={paths[index]}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                {icons[index] }
                </ListItemIcon>
                <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
       
        <Divider />
        
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3}}>
        <DrawerHeader />
      </Box>
    </Box>
  );
}
