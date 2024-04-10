import {
  Dialog,
  Stack,
  DialogTitle,
  Typography,
  Button,
  ListItem,
  Avatar,
} from '@mui/material';
import { sampleNotifications } from '../../constants/sampleData';
import { memo } from 'react';
const Notifications = () => {
  const friendRequestHandler = ({ id, accept }) => {
    console.log(id);
    console.log(accept);
  };
  return (
    <Dialog open>
      <Stack p={{ xs: '1rem', sm: '2rem' }}>
        <DialogTitle>Notifications</DialogTitle>

        {sampleNotifications.length > 0 ? (
          sampleNotifications.map((notification, index) => (
            <NotificationItem
              sender={notification.sender}
              id={notification.id}
              handler={friendRequestHandler}
            />
          ))
        ) : (
          <Typography textAlign={'center'}>No notifications</Typography>
        )}
      </Stack>
    </Dialog>
  );
};

const NotificationItem = memo(({ sender, id }) => {
  const { name, avatar } = sender;
  return (
    <ListItem>
      <Stack
        direction={'row'}
        alignItems={'center'}
        spacing={'1rem'}
        width={'100%'}
      >
        <Avatar src={avatar} />
        <Typography
          variant="body1"
          sx={{
            flexGrow: 1,
            display: '-webkit-box',
            WebkitLineClamp: 1,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            width: '100%',
          }}
        >
          {`${name} send you a friend Request`}
        </Typography>
        <Stack direction={{ xs: 'column', sm: 'row' }}>
          <Button onClick={() => handler({ id, accept: true })}>Accept</Button>
          <Button color="error" onClick={() => handler({ id, accept: false })}>
            Reject
          </Button>
        </Stack>
      </Stack>
    </ListItem>
  );
});

export default Notifications;
