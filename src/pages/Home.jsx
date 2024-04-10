import AppLayout from '../components/layouts/AppLayout';
import { Typography, Box } from '@mui/material';
const Home = () => {
  return (
    <Box
      bgcolor={'gray'}
      height={'100%'}
      m={'auto'}
      sx={{
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Typography
        variant="h5"
        p={'2rem'}
        textAlign={'center'}
        color={'#ffffff'}
      >
        Select a friend to Chat
      </Typography>
    </Box>
  );
};

export default AppLayout()(Home);
