import {
  Add as AddIcon,
  Group as GroupIcon,
  Logout as LogoutIcon,
  Menu as MenuIcon,
  Notifications as NotificationsIcon,
  Search as SearchIcon,
} from '@mui/icons-material';
import {
  AppBar,
  Backdrop,
  Badge,
  Box,
  IconButton,
  Toolbar,
  Tooltip,
  Typography,
} from '@mui/material';
import { Suspense, lazy, useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import api from '../../api.js';
import { BLUE_COLOR } from '../../constants/color';
import { useDispatch, useSelector } from 'react-redux';
import { userNotExists } from '../../redux/reducers/auth.js';
import {
  setIsMobileMenuFriend,
  setIsSearch,
  setIsNewGroup,
  setIsNotification,
} from '../../redux/reducers/others.js';
import { resetNotification } from '../../redux/reducers/chat.js';
const SearchDialog = lazy(() => import('../specific/Search.jsx'));
const NotificationsDialog = lazy(() => import('../specific/Notifications.jsx'));
const NewGroupDialog = lazy(() => import('../specific/NewGroup.jsx'));

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isNotification, isNewGroup, isSearch } = useSelector(
    (state) => state.others
  );
  const { notificationCount } = useSelector((state) => state.chat);
  const handleMobile = () => {
    dispatch(setIsMobileMenuFriend(true));
  };

  const openSearchDialog = () => dispatch(setIsSearch(true));
  const openNewGroup = () => dispatch(setIsNewGroup(true));
  const openNotification = () => {
    dispatch(setIsNotification(true));
    dispatch(resetNotification());
  }

  const navigateToGroup = () => navigate('/groups');
  const logoutHandler = async () => {
    try {
      const data = await api.getUserLogout();
      dispatch(userNotExists());
      toast.success(data.message);
    } catch (error) {
      toast.error(error.response.data.message || 'Logout failure');
    }
  };
  return (
    <>
      <Box sx={{ flexGrow: 1 }} height={'4rem'}>
        <AppBar position="static" sx={{ bgcolor: BLUE_COLOR }}>
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
                value={notificationCount}
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

const IconBtn = ({ title, icon, onClick, value }) => {
  return (
    <Tooltip title={title}>
      <IconButton color="inherit" size="large" onClick={onClick}>
        {value ? (
          <Badge badgeContent={value} color="error">
            {icon}
          </Badge>
        ) : (
          icon
        )}
      </IconButton>
    </Tooltip>
  );
};

export default Header;
