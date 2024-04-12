import { useRef } from 'react';
import AppLayout from '../components/layouts/AppLayout.jsx';
import { Stack, IconButton } from '@mui/material';
import {
  AttachFile as AttachFileIcon,
  Send as SendIcon,
} from '@mui/icons-material';
import FileMenu from '../components/dialog/FileMenu.jsx';
import { InputBox } from '../components/styles/StyledComponents.jsx';
import { BLUE_COLOR, GRAY_COLOR } from '../constants/color.js';
import { sampleMessage } from '../constants/sampleData.js';
import MessageComponent from '../components/shared/MessageComponent.jsx';
const Chat = () => {
  const containerRef = useRef(null);

  const user = {
    id: '1',
    name: 'Rahul',
  };
  return (
    <>
      <Stack
        ref={containerRef}
        boxSizing={'border-box'}
        padding={'1rem'}
        spacing={'1rem'}
        bgcolor={GRAY_COLOR}
        height={'90%'}
        sx={{ overflowX: 'hidden', overflowY: 'auto' }}
      >
        {sampleMessage.map((message) => (
          <MessageComponent message={message} user={user} key={message._id} />
        ))}
      </Stack>

      <form style={{ height: '10%' }}>
        <Stack
          direction={'row'}
          height={'100%'}
          padding={'11px'}
          alignItems={'center'}
          position={'relative'}
        >
          <IconButton
            sx={{ position: 'absolute', left: '1.5rem', rotate: '30deg' }}
          >
            <AttachFileIcon />
          </IconButton>

          <InputBox placeholder="Type a message" />

          <IconButton
            type="submit"
            sx={{
              rotate: '-30deg',
              bgcolor: BLUE_COLOR,
              color: '#ffffff',
              marginLeft: '1rem',
              padding: '0.5rem',
              '&:hover': { bgcolor: 'primary.dark' },
            }}
          >
            <SendIcon />
          </IconButton>
        </Stack>
      </form>

      <FileMenu anchorE1={''} />
    </>
  );
};

export default AppLayout()(Chat);
