import {
  Dialog,
  Stack,
  DialogTitle,
  Typography,
  Button,
  TextField,
} from '@mui/material';
import { sampleUsers } from '../../constants/sampleData';
import UserItem from '../shared/UserItem';
import { useInputValidation } from '6pp';
import { useState } from 'react';
const NewGroup = () => {
  const groupName = useInputValidation('');
  let isLoadingSendFriendRequest = false;

  const [members, setMembers] = useState(sampleUsers);
  const [selectedMembers, setSelectedMembers] = useState([]);
  const selectMemberHandler = (id) => {
    setSelectedMembers((prev) =>
      prev.includes(id)
        ? prev.filter((currEle) => currEle !== id)
        : [...prev, id]
    );
  };
  console.log(selectedMembers);
  const submitHandler = () => {};
  const closeHandler = () => {};
  return (
    <Dialog open>
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
          {members.map((user, index) => (
            <UserItem
              user={user}
              id={user.id}
              key={user.id}
              handler={selectMemberHandler}
              handlerIsLoading={isLoadingSendFriendRequest}
              isAdded={selectedMembers.includes(user.id)}
            />
          ))}
        </Stack>

        <Stack direction={'row'} justifyContent={'space-evenly'}>
          <Button variant="text" color="error" size="large">
            Cancel
          </Button>
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={submitHandler}
          >
            Create
          </Button>
        </Stack>
      </Stack>
    </Dialog>
  );
};

export default NewGroup;
