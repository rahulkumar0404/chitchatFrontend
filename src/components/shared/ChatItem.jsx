import { Link } from '../styles/StyledComponents';
import { Stack, Typography, Box } from '@mui/material';
import AvatarCard from '../shared/AvatarCard.jsx';
import { memo } from 'react';
const ChatItem = ({
  avatar = [],
  name,
  id,
  groupChat = false,
  sameSender,
  isOnline,
  newMessageAlert,
  index = 0,
  handleDeleteChat,
  lastMessage,
}) => {
  return (
    <Link
      sx={{ padding: '0' }}
      to={`/chat/${id}`}
      onContextMenu={(e) => handleDeleteChat(e, id, groupChat)}
    >
      <div
        style={{
          display: 'flex',
          gap: '1rem',
          alignItems: 'center',
          padding: '1rem',
          backgroundColor: sameSender ? '#4376b0' : 'unset',
          color: sameSender ? 'white' : 'unset',
          position: 'relative',
        }}
      >
        <AvatarCard avatar={avatar} />

        <Stack>
          <Typography>{name}</Typography>

          {newMessageAlert && (
            <Typography>{newMessageAlert?.count} New Message</Typography>
          )}
        </Stack>

        {isOnline && (
          <Box
            sx={{
              width: '10px',
              height: '10px',
              borderRadius: '50%',
              backgroundColor: 'GREEN_COLOR',
              position: 'absolute',
              top: '50%',
              right: '1rem',
              transform: 'translateY(-50%)',
            }}
          />
        )}
      </div>
    </Link>
  );
};

export default memo(ChatItem);
