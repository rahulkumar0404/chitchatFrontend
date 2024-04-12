import Header from './Header.jsx';
import Title from '../shared/Title.jsx';
import { Grid } from '@mui/material';
import ChatList from '../specific/ChatList.jsx';
import { sampleChats } from '../../constants/sampleData.js';
import Profile from '../specific/Profile.jsx';
import { useParams } from 'react-router-dom';
import { LIGHT_BLACK_COLOR } from '../../constants/color.js';
const AppLayout = () => (WrappedComponent) => {
  const handleDeleteChat = (e, id, groupChat) => {
    e.preventDefault();
    console.log('Delete chat', id, groupChat);
  };
  return (props) => {
    const params = useParams();
    const chatId = params.chatId;
    return (
      <>
        <Title />
        <Header />
        <Grid container height={'calc(100vh - 4rem)'}>
          <Grid
            item
            sm={4}
            md={3}
            sx={{
              display: { xs: 'none', sm: 'block' },
            }}
            height={'100%'}
          >
            <ChatList
              chats={sampleChats}
              chatId={chatId}
              handleDeleteChat={handleDeleteChat}
            />
          </Grid>
          <Grid item xs={12} sm={8} md={5} lg={6} height={'100%'}>
            <WrappedComponent {...props} />
          </Grid>

          <Grid
            item
            md={4}
            lg={3}
            height={'100%'}
            sx={{
              display: { xs: 'none', md: 'block' },
              padding: '2rem',
              bgcolor: LIGHT_BLACK_COLOR,
            }}
          >
            <Profile />
          </Grid>
        </Grid>
      </>
    );
  };
};

export default AppLayout;
