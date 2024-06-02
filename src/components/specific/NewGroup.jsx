import {
  Dialog,
  Stack,
  DialogTitle,
  Typography,
  Button,
  TextField,
  Skeleton,
} from '@mui/material';
import { sampleUsers } from '../../constants/sampleData';
import UserItem from '../shared/UserItem';
import { useInputValidation } from '6pp';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useAvailableFriends, useNewGroupMutation } from '../../redux/api/api';
import { useErrors, useMutation } from '../../hooks/hook';
import { setIsNewGroup } from '../../redux/reducers/others';
import toast from 'react-hot-toast';
import { LoadingButton } from '@mui/lab';
const NewGroup = () => {
  const { isNewGroup } = useSelector((state) => state.others);
  const dispatch = useDispatch();
  const { isError, isLoading, error, data } = useAvailableFriends();
  const {
    excuteMutation: newGroup,
    isLoading: isLoadingNewGroup,
    data: newGroupData,
  } = useMutation(useNewGroupMutation);
  const groupName = useInputValidation('');
  let isLoadingSendFriendRequest = false;
  const errors = [
    {
      isError,
      error,
    },
  ];

  useErrors(errors);
  const [selectedMembers, setSelectedMembers] = useState([]);
  const selectMemberHandler = (id) => {
    setSelectedMembers((prev) =>
      prev.includes(id)
        ? prev.filter((currEle) => currEle !== id)
        : [...prev, id]
    );
  };
  const submitHandler = () => {
    if (!groupName.value || groupName.value.length < 3)
      return toast.error('Group name is minimum 3 character long');
    if (selectedMembers.length < 2)
      return toast.error('Minimum 3 members is required');
    // create a new group
    newGroup('Creating a new Group', {
      groupName: groupName.value,
      members: selectedMembers,
    });
    closeHandler();
  };
  const closeHandler = () => {
    dispatch(setIsNewGroup(false));
  };
  return (
    <Dialog open={isNewGroup} onClose={closeHandler}>
      <Stack p={{ xs: '1rem', sm: '2rem' }} width={'25rem'} spacing={'1.5rem'}>
        <DialogTitle textAlign={'center'} variant="h5">
          New Group
        </DialogTitle>

        <TextField
          label="Group Name"
          value={groupName.value}
          onChange={groupName.changeHandler}
        />
        <Typography variant="body1">Members</Typography>
        <Stack>
          {isLoading ? (
            <Skeleton />
          ) : (
            data.friends?.map((user, index) => (
              <UserItem
                user={user}
                id={user._id}
                key={user._id}
                handler={selectMemberHandler}
                handlerIsLoading={isLoadingSendFriendRequest}
                isAdded={selectedMembers.includes(user._id)}
              />
            ))
          )}
        </Stack>

        <Stack direction={'row'} justifyContent={'space-evenly'}>
          <Button
            variant="text"
            color="error"
            size="large"
            onClick={closeHandler}
          >
            Cancel
          </Button>
          {isLoadingNewGroup ? (
            <LoadingButton loading variant="outlined">
              Loading
            </LoadingButton>
          ) : (
            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={submitHandler}
              disabled={isLoadingNewGroup}
            >
              Create
            </Button>
          )}
        </Stack>
      </Stack>
    </Dialog>
  );
};

export default NewGroup;
