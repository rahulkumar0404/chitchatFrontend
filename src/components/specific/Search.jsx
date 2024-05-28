import { useInputValidation } from '6pp';
import { Search as SearchIcon } from '@mui/icons-material';
import {
  Dialog,
  DialogTitle,
  InputAdornment,
  List,
  Stack,
  TextField,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useMutation } from '../../hooks/hook';
import {
  useLazySearchQuery,
  useSendFriendRequestMutation,
} from '../../redux/api/api';
import { setIsSearch } from '../../redux/reducers/others';
import UserItem from '../shared/UserItem';
const Search = () => {
  const { isSearch } = useSelector((state) => state.others);
  const [searchUser] = useLazySearchQuery('');
  const {
    excuteMutation: sendFriendRequest,
    isLoading: isLoadingSendFriendRequest,
  } = useMutation(useSendFriendRequestMutation);
  const dispatch = useDispatch();
  const search = useInputValidation('');

  const [users, setUsers] = useState([]);
  const addFriendHandler = async (id) => {
    console.log(id);
    await sendFriendRequest('Sending Friend Request..', { receiverId: id });
  };
  const searchCloseHandler = () => dispatch(setIsSearch(false));
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      searchUser(search.value)
        .then(({ data }) => {
          setUsers(data.users);
        })
        .catch((err) => {
          console.log(err);
        });
    }, 1000);
    return () => {
      clearTimeout(timeoutId);
    };
  }, [search.value]);
  return (
    <Dialog open={isSearch} onClose={searchCloseHandler}>
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
              key={user._id}
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
