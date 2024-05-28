import {
  Dialog,
  Stack,
  DialogTitle,
  Typography,
  Button,
  ListItem,
  Avatar,
  Skeleton,
} from '@mui/material';
import { transformImage } from '../../lib/features';
import { memo } from 'react';
import {
  useAcceptFriendRequest,
  useGetNotificationQuery,
} from '../../redux/api/api';
import { useErrors, useMutation } from '../../hooks/hook';
import { useDispatch, useSelector } from 'react-redux';
import { setIsNotification } from '../../redux/reducers/others';
import toast from 'react-hot-toast';
const Notifications = () => {
  const { isNotification } = useSelector((state) => state.others);
  const dispatch = useDispatch();
  const { isLoading, data, isError, error } = useGetNotificationQuery();
  const [acceptRequest] = useAcceptFriendRequest();
  const friendRequestHandler = async ({ senderId, accept }) => {
    try {
      const res = acceptRequest({ senderId, accept });
      if (res.data) {
        console.log('Use socket here');
        console.log(res.data);
      } else {
        toast.error(
          res.data.error.message || 'Failure to accept request Please try again'
        );
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  const handleNotification = () => dispatch(setIsNotification(false));
  useErrors([{ error, isError }]);
  return (
    <Dialog open={isNotification} onClose={handleNotification}>
      <Stack p={{ xs: '1rem', sm: '2rem' }}>
        <DialogTitle>Notifications</DialogTitle>
        {isLoading ? (
          <Skeleton />
        ) : (
          <>
            {data.result.length > 0 ? (
              data.result.map((notification, index) => (
                <NotificationItem
                  sender={notification.sender}
                  id={notification._id}
                  handler={friendRequestHandler}
                />
              ))
            ) : (
              <Typography textAlign={'center'}>No notifications</Typography>
            )}
          </>
        )}
      </Stack>
    </Dialog>
  );
};

const NotificationItem = memo(({ sender, id, handler }) => {
  const { name, avatar, _id: senderId } = sender;
  return (
    <ListItem>
      <Stack
        direction={'row'}
        alignItems={'center'}
        spacing={'1rem'}
        width={'100%'}
      >
        <Avatar src={transformImage(avatar)} />
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
          <Button onClick={() => handler({ senderId, accept: true })}>
            Accept
          </Button>
          <Button
            color="error"
            onClick={() => handler({ senderId, accept: false })}
          >
            Reject
          </Button>
        </Stack>
      </Stack>
    </ListItem>
  );
});

export default Notifications;
