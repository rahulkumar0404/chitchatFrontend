import {
  Dialog,
  Stack,
  DialogTitle,
  TextField,
  InputAdornment,
  List,
} from '@mui/material';
import { useInputValidation } from '6pp';
import { Search as SearchIcon } from '@mui/icons-material';
import UserItem from '../shared/UserItem';
import { useState } from 'react';
import { sampleUsers } from '../../constants/sampleData';

const Search = () => {
  const search = useInputValidation('');

  let isLoadingSendFriendRequest = false;

  const [users, setUsers] = useState(sampleUsers);
  const addFriendHandler = (id) => {
    console.log("send friend request to User Id", id)
  }
  return (
    <Dialog open>
      <Stack p={'2rem'} direction={'column'} width={'25rem'}>
        <DialogTitle textAlign={'center'}>Find People</DialogTitle>
        <TextField
          label=""
          value={search.value}
          onChange={search.changeHandler}
          variant="outlined"
          size="small"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />

        <List>
          {users.map((user) => (
            <UserItem
              user={user}
              key={user.id}
              handler={addFriendHandler}
              handlerIsLoading={isLoadingSendFriendRequest}
            />
          ))}
        </List>
      </Stack>
    </Dialog>
  );
};

export default Search;
