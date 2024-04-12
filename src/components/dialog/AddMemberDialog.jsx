import { Dialog, Stack, DialogTitle, Typography, Button } from '@mui/material';
import { sampleUsers } from '../../constants/sampleData';
import UserItem from '../shared/UserItem.jsx';
import { useState } from 'react';
import {
  DARK_GRAY_COLOR,
  LIGHT_GRAY_COLOR,
  BLACK_COLOR,
  WHITE_COLOR,
} from '../../constants/color.js';
const AddMemberDialog = ({ addMember, isLoadingAddMember, chatID }) => {
  const [addedMembers, setAddedMembers] = useState(sampleUsers);
  const [selectAddedMembers, setSelectAddedMembers] = useState([]);

  const selectMemberHandler = (id) => {
    setSelectAddedMembers((prev) =>
      prev.includes(id)
        ? prev.filter((currEle) => currEle !== id)
        : [...prev, id]
    );
  };
  const addMemberSubmitHandler = () => {
    console.log('add member request submitted');
    closeHandler();
  };
  const closeHandler = () => {
    setSelectAddedMembers([]);
    setAddedMembers([]);
  };
  return (
    <Dialog open>
      <Stack p={'2rem'} width={'20rem'} spacing={'2rem'}>
        <DialogTitle textAlign={'center'} variant="h4">
          Add Member
        </DialogTitle>
        <Stack spacing={'1rem'}>
          {addedMembers.length > 0 ? (
            addedMembers.map((user) => (
              <UserItem
                key={user.id}
                user={user}
                handler={() => selectMemberHandler(user.id)}
                isAdded={selectAddedMembers.includes(user.id)}
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
            disabled={isLoadingAddMember}
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
