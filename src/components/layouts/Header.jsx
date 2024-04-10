import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  IconButton,
  Tooltip,
  Backdrop,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Search as SearchIcon,
  Add as AddIcon,
  Group as GroupIcon,
  Notifications as NotificationsIcon,
  Logout as LogoutIcon,
} from '@mui/icons-material';
import { orange, blue } from '../../constants/color';
import { useNavigate } from 'react-router-dom';
import { Suspense, lazy, useState } from 'react';

const SearchDialog = lazy(() => import('../specific/Search.jsx'));
const NotificationsDialog = lazy(() => import('../specific/Notifications.jsx'));
const NewGroupDialog = lazy(() => import('../specific/NewGroup.jsx'));

const Header = () => {
  const navigate = useNavigate();

  const [ismobile, setIsMobile] = useState(false);
  const [isSearch, setIsSearch] = useState(false);
  const [isNewGroup, setIsNewGroup] = useState(false);
  const [isNotification, setIsNotification] = useState(false);
  const handleMobile = () => {
    setIsMobile((prev) => !prev);
  };

  const openSearchDialog = () => {
    setIsSearch((prev) => !prev);
  };
  const openNewGroup = () => {
    setIsNewGroup((prev) => !prev);
  };
  const openNotification = () => {
    setIsNewGroup((prev) => !prev);
  };
  const navigateToGroup = () => navigate('/groups');
  const logoutHandler = () => {
    console.log('Logout!');
  };
  return (
    <>
      <Box sx={{ flexGrow: 1 }} height={'4rem'}>
        <AppBar position="static" sx={{ bgcolor: blue }}>
          <Toolbar>
            <Typography
              variant="h6"
              sx={{ display: { xs: 'none', sm: 'block' } }}
            >
              ChitChat
            </Typography>

            <Box sx={{ display: { xs: 'block', sm: 'none' } }}>
              <IconButton color="inherit" onClick={handleMobile}>
                <MenuIcon />
              </IconButton>
            </Box>
            <Box sx={{ flexGrow: 1 }} />
            <Box>
              <IconBtn
                title="Open Search"
                icon={<SearchIcon />}
                onClick={openSearchDialog}
              />
              <IconBtn
                title="New Group"
                icon={<AddIcon />}
                onClick={openNewGroup}
              />
              <IconBtn
                title="Manage Group"
                icon={<GroupIcon />}
                onClick={navigateToGroup}
              />
              <IconBtn
                title="Notification"
                icon={<NotificationsIcon />}
                onClick={openNotification}
              />
              <IconBtn
                title="Logout"
                icon={<LogoutIcon />}
                onClick={logoutHandler}
              />
            </Box>
          </Toolbar>
        </AppBar>
      </Box>

      {isSearch && (
        <Suspense fallback={<Backdrop open />}>
          <SearchDialog />
        </Suspense>
      )}
      {isNotification && (
        <Suspense fallback={<Backdrop open />}>
          <NotificationsDialog />
        </Suspense>
      )}
      {isNewGroup && (
        <Suspense fallback={<Backdrop open />}>
          <NewGroupDialog />
        </Suspense>
      )}
    </>
  );
};

const IconBtn = ({ title, icon, onClick }) => {
  return (
    <Tooltip title={title}>
      <IconButton color="inherit" size="large" onClick={onClick}>
        {icon}
      </IconButton>
    </Tooltip>
  );
};

export default Header;
