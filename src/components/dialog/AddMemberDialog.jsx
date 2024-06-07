import {
  Dialog,
  Stack,
  DialogTitle,
  Typography,
  Button,
  Skeleton,
} from '@mui/material';
import { sampleUsers } from '../../constants/sampleData';
import UserItem from '../shared/UserItem.jsx';
import { useState } from 'react';
import {
  DARK_GRAY_COLOR,
  LIGHT_GRAY_COLOR,
  BLACK_COLOR,
  WHITE_COLOR,
} from '../../constants/color.js';
import { useAddGroupMember, useAvailableFriends } from '../../redux/api/api.js';
import { useErrors, useMutation } from '../../hooks/hook.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { setIsAddMember } from '../../redux/reducers/others.js';
const AddMemberDialog = ({ chatId }) => {
  const dispatch = useDispatch();
  const { isAddMember } = useSelector((state) => state.others);
  const { isLoading, data, error, isError } = useAvailableFriends(chatId);
  const { excuteMutation: addGroupMembers, isLoading: isLoadingAddMembers } =
    useMutation(useAddGroupMember);
  const [selectAddedMembers, setSelectAddedMembers] = useState([]);
  console.log(data?.availableFriends);
  const selectMemberHandler = (id) => {
    setSelectAddedMembers((prev) =>
      prev.includes(id)
        ? prev.filter((currEle) => currEle !== id)
        : [...prev, id]
    );
  };
  const addMemberSubmitHandler = () => {
    addGroupMembers('Adding members...', {
      chatId,
      members: selectAddedMembers,
    });
    closeHandler();
  };
  const closeHandler = () => {
    setSelectAddedMembers([]);
    dispatch(setIsAddMember(false));
  };

  useErrors([{ isError, error }]);
  return (
    <Dialog open={isAddMember} onClose={closeHandler}>
      <Stack p={'2rem'} width={'20rem'} spacing={'2rem'}>
        <DialogTitle textAlign={'center'} variant="h4">
          Add Member
        </DialogTitle>
        <Stack spacing={'1rem'}>
          {isLoading ? (
            <Skeleton />
          ) : data?.availableFriends.length > 0 ? (
            data?.availableFriends.map((user) => (
              <UserItem
                key={user._id}
                user={user}
                handler={() => selectMemberHandler(user._id)}
                isAdded={selectAddedMembers.includes(user._id)}
              />
            ))
          ) : (
            <Typography textAlign={'center'}>No Friend</Typography>
          )}
        </Stack>
        <Stack
          direction={'row'}
          alignItems={'center'}
          justifyContent={'space-evenly'}
        >
          <Button
            sx={{
              color: BLACK_COLOR,
              bgcolor: LIGHT_GRAY_COLOR,
              '&:hover': { bgcolor: DARK_GRAY_COLOR, color: WHITE_COLOR },
              transition: `background-color 0.5s ease, color 1s ease`,
            }}
            variant="contained"
            onClick={closeHandler}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            disabled={isLoadingAddMembers}
            onClick={addMemberSubmitHandler}
          >
            Submit
          </Button>
        </Stack>
      </Stack>
    </Dialog>
  );
};

export default AddMemberDialog;
