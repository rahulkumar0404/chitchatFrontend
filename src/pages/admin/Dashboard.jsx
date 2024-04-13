import React from 'react';
import AdminLayout from '../../components/layouts/AdminLayout';
import {
  Container,
  Paper,
  Stack,
  Button,
  Typography,
  Box,
} from '@mui/material';
import {
  AdminPanelSettings as AdminPanelSettingsIcon,
  Group as GroupIcon,
  Notifications as NotificationIcon,
  Person as PersonIcon,
  Message as MessageIcon,
} from '@mui/icons-material';
import {
  SearchField,
  CurvedButton,
} from '../../components/styles/StyledComponents';
import moment from 'moment';
import { LineChart, DoughnutChart } from '../../components/shared/Chart';
const Dashboard = () => {
  const Appbar = () => {
    return (
      <Paper
        elevation={3}
        sx={{ padding: '2rem', margin: '2rem 0', borderRadius: '1rem' }}
      >
        <Stack direction={'row'} alignItems={'center'} spacing={'1rem'}>
          <AdminPanelSettingsIcon sx={{ fontSize: '3rem' }} />
          <SearchField />
          <CurvedButton>Search</CurvedButton>
          <Box flexGrow={1} />
          <Typography sx={{ display: { xs: 'none', lg: 'block' } }}>
            {moment(Date.now()).format('DD/MM/YYYY H:MM:SS A')}
          </Typography>

          <NotificationIcon />
        </Stack>
      </Paper>
    );
  };

  const Widgets = () => {
    return (
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        spacing={'2rem'}
        justifyContent={'space-between'}
        alignItems={'center'}
        margin={'2rem 0'}
      >
        <Widget title={'Users'} value={34} Icon={<PersonIcon />} />
        <Widget title={'Chats'} value={3} Icon={<GroupIcon />} />
        <Widget title={'Messages'} value={434} Icon={<MessageIcon />} />
      </Stack>
    );
  };
  return (
    <AdminLayout>
      <Container component={'main'}>
        <Appbar />
        <Stack direction={'row'} spacing={'2rem'} flexWrap={'wrap'}>
          <Paper
            elevation={3}
            sx={{
              padding: '2rem 3.5rem',
              borderRadius: '1rem',
              width: '100%',
              maxWidth: '45rem',
              height: '25rem',
            }}
          >
            <Typography>Last Messages</Typography>

            <LineChart value={[1, 2, 34, 6]} />
          </Paper>
          <Paper
            elevation={3}
            sx={{
              padding: '1rem',
              borderRadius: '1rem',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              width: { xs: '100%', sm: '50%' },
              position: 'relative',
              width: '100%',
              maxWidth: '25rem',
              height: '25rem',
            }}
          >
            <DoughnutChart
              labels={['Single Chats', 'Group Chats']}
              value={[23, 66]}
            />
            <Stack
              position={'absolute'}
              direction={'row'}
              justifyContent={'center'}
              alignItems={'center'}
              spacing={'0.5rem'}
              width={'100%'}
              height={'100%'}
            >
              <GroupIcon />
              <Typography>Vs</Typography>
              <PersonIcon />
            </Stack>
          </Paper>
        </Stack>
        <Widgets />
      </Container>
    </AdminLayout>
  );
};

const Widget = ({ title, value, Icon }) => {
  return (
    <Paper
      elevation={3}
      sx={{
        padding: '2rem',
        margin: '2rem 0',
        borderRadius: '1.5rem',
        width: '20rem',
      }}
    >
      <Stack alignItems={'center'} spacing={'1rem'}>
        <Typography
          sx={{
            color: 'rgba(0,0,0,0.7)',
            borderRadius: '50%',
            border: '5px solid rgba(0,0,0,0.5)',
            width: '5rem',
            height: '5rem',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {value}
        </Typography>
        <Stack direction={'row'} spacing={'1rem'} alignItems={'center'}>
          {Icon}
        </Stack>
        <Typography>{title}</Typography>
      </Stack>
    </Paper>
  );
};
export default Dashboard;
