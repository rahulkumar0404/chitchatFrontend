import { Menu, Stack, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { setIsDeleteMenu } from '../../redux/reducers/others';
import {
  Delete as DeleteIcon,
  ExitToApp as ExitToAppIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router';
import { useMutation } from '../../hooks/hook';
import { useDeleteGroupChat, useLeaveGroupChat } from '../../redux/api/api';
import { useEffect } from 'react';

const DeleteChatMenu = ({ dispatch, deleteMenuAnchor }) => {
  const navigate = useNavigate();
  const { isDeleteMenu, selectedDeleteChat } = useSelector(
    (state) => state.others
  );

  const { excuteMutation: deleteChat, data: deleteChatData } =
    useMutation(useDeleteGroupChat);
  const {
    excuteMutation: leaveGroupChat,
    _,
    data: leaveGroupChatData,
  } = useMutation(useLeaveGroupChat);
  const isGroup = selectedDeleteChat.groupChat;
  const closeHandler = () => {
    dispatch(setIsDeleteMenu(false));
    deleteMenuAnchor.current = null;
  };

  const leaveGroupHandler = (isGroup) => {
    closeHandler();
    if (isGroup) {
      leaveGroupChat('Leaving Group chat..', {
        chatId: selectedDeleteChat.chatId,
      });
    } else {
      deleteChat('Deleting chat..', { chatId: selectedDeleteChat.chatId });
    }
  };
  const deleteChatHandler = () => {
    closeHandler();
    deleteChat('Deleting chat..', { chatId: selectedDeleteChat.chatId });
  };

  useEffect(() => {
    if (deleteChatData || leaveGroupChatData) {
      navigate('/');
    }
  }, [deleteChatData, leaveGroupChatData]);
  return (
    <Menu
      open={isDeleteMenu}
      onClose={closeHandler}
      anchorEl={deleteMenuAnchor.current}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      transformOrigin={{ vertical: 'center', horizontal: 'center' }}
    >
      <Stack
        sx={{ width: '10rem', padding: '0.5rem', cursor: 'pointer' }}
        direction={'row'}
        alignItems={'center'}
        spacing={'0.5rem'}
        // onClick={isGroup ? leaveGroupHandler : deleteChatHandler}
        onClick={() => leaveGroupHandler(isGroup)}
      >
        {isGroup ? (
          <>
            <ExitToAppIcon /> <Typography>Leave Group</Typography>
          </>
        ) : (
          <>
            <DeleteIcon />
            <Typography>Delete Chat</Typography>{' '}
          </>
        )}
      </Stack>
    </Menu>
  );
};

export default DeleteChatMenu;
