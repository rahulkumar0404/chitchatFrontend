import { Stack, Avatar, Typography } from '@mui/material';
import moment from 'moment';
import {
  Face as FaceIcon,
  AlternateEmail as UsernameIcon,
  CalendarMonth as CalendarIcon,
} from '@mui/icons-material';
const Profile = () => {
  return (
    <Stack spacing={'1.5rem'} direction={'column'} alignItems={'center'}>
      <Avatar
        sx={{
          width: 200,
          height: 200,
          objectFit: 'contain',
          marginBottom: '1rem',
          border: '5px solid white',
        }}
      />
      <ProfileCard heading={'Bio'} text={'jjsjsjsjsjs'} />
      <ProfileCard
        heading={'Username'}
        text={'rahulkumar'}
        Icon={UsernameIcon}
      />
      <ProfileCard heading={'Name'} text={'Rahul kumar'} Icon={FaceIcon} />
      <ProfileCard
        heading={'Joined'}
        text={moment('2023-11-05T00:00:00.000Z').fromNow()}
        Icon={CalendarIcon}
      />
    </Stack>
  );
};

const ProfileCard = ({ text, Icon, heading }) => {
  return (
    <Stack
      direction={'row'}
      alignItems={'center'}
      color={'#ffffff'}
      spacing={'1rem'}
      textAlign={'center'}
    >
      {Icon && <Icon />}

      <Stack>
        <Typography varient="body1">{text}</Typography>
        <Typography color={'gray'} variant="caption">
          {heading}
        </Typography>
      </Stack>
    </Stack>
  );
};

export default Profile;
