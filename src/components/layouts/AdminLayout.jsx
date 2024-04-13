import React, { useState } from 'react';
import {
  Box,
  Grid,
  IconButton,
  Drawer,
  Stack,
  Typography,
} from '@mui/material';
import {
  GRAY_COLOR,
  LIGHT_BLACK_COLOR,
  WHITE_COLOR,
} from '../../constants/color';
import { Navigate, useLocation } from 'react-router-dom';
import {
  Menu as MenuIcon,
  Close as CloseIcon,
  ExitToApp as ExitToAppIcon,
} from '@mui/icons-material';
import { adminTabs } from '../../constants/route.js';
import { DashboardLink } from '../styles/StyledComponents.jsx';
const Sidebar = ({ w = '100%' }) => {
  const location = useLocation();

  const logoutHandler = () => {
    console.log('logout');
  };
  return (
    <Stack width={w} direction={'column'} p={'3rem'} spacing={'3rem'}>
      <Typography variant="h5" textTransform={'uppercase'}>
        ChitChat
      </Typography>

      <Stack spacing={'1rem'}>
        {adminTabs.map((tab) => (
          <DashboardLink
            key={tab.path}
            to={tab.path}
            sx={
              location.pathname === tab.path && {
                bgcolor: LIGHT_BLACK_COLOR,
                color: WHITE_COLOR,
                ':hover': { color: GRAY_COLOR },
              }
            }
          >
            <Stack direction={'row'} alignItems={'center'} spacing={'1rem'}>
              {<tab.icon />}
              <Typography>{tab.name}</Typography>
            </Stack>
          </DashboardLink>
        ))}

        <DashboardLink onClick={logoutHandler}>
          <Stack direction={'row'} alignItems={'center'} spacing={'1rem'}>
            <ExitToAppIcon />
            <Typography fontSize={'15px'}>Logout</Typography>
          </Stack>
        </DashboardLink>
      </Stack>
    </Stack>
  );
};

const isAdmin = true;
const AdminLayout = ({ children }) => {
  const [isMobile, setIsMobile] = useState(false);
  const handleMobile = () => {
    setIsMobile((prev) => !prev);
  };
  const handleClose = () => {
    setIsMobile(false);
  };

  if (!isAdmin) return <Navigate to="/admin" />;
  return (
    <Grid container minHeight={'100vh'}>
      <Box
        sx={{
          display: { xs: 'block', md: 'none' },
          position: 'fixed',
          right: '1rem',
          top: '1rem',
        }}
      >
        <IconButton onClick={handleMobile}>
          {isMobile ? <CloseIcon /> : <MenuIcon />}
        </IconButton>
      </Box>
      <Grid item md={4} lg={3} sx={{ display: { xs: 'none', md: 'block' } }}>
        <Sidebar />
      </Grid>
      <Grid item xs={12} md={8} lg={9} sx={{ bgcolor: GRAY_COLOR }}>
        {children}
      </Grid>

      <Drawer open={isMobile} onClose={handleClose}>
        <Sidebar w="50vw" />
      </Drawer>
    </Grid>
  );
};

export default AdminLayout;
