import {
  Grid,
  Tooltip,
  IconButton,
  Box,
  Drawer,
  Stack,
  Typography,
  TextField,
  Button,
  Backdrop,
  Skeleton,
  CircularProgress,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  GREEN_COLOR,
  LIGHT_BLUE_COLOR,
  LIGHT_SKYBLUE_COLOR,
  TRANSPARENT_BLACK,
} from '../constants/color.js';
import {
  KeyboardBackspace as KeyboardBackspaceIcon,
  Menu as MenuIcon,
  Edit as EditIcon,
  Done as DoneIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
} from '@mui/icons-material';
import { useState, memo, useEffect, lazy, Suspense } from 'react';
import { Link } from '../components/styles/StyledComponents.jsx';
import AvatarCard from '../components/shared/AvatarCard.jsx';
import { DELETE_GROUP_MSG } from '../constants/constants.js';
import UserItem from '../components/shared/UserItem.jsx';
import {
  useAddGroupMember,
  useDeleteGroupChat,
  useGetChatDetailsQuery,
  useGetMyGroups,
  useRemoveGroupMember,
  useRenameGroupMutation,
} from '../redux/api/api.js';
import { useErrors, useMutation } from '../hooks/hook.jsx';
import { LayoutLoader } from '../components/layouts/Loaders.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { setIsAddMember } from '../redux/reducers/others.js';
const ConfirmDeleteDialog = lazy(() =>
  import('../components/dialog/ConfirmDeleteDialog.jsx')
);

const AddMemberDialog = lazy(() =>
  import('../components/dialog/AddMemberDialog.jsx')
);
const Groups = () => {
  const chatId = useSearchParams()[0].get('group');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAddMember } = useSelector((state) => state.others);
  const myGroups = useGetMyGroups('');
  const groupDetails = useGetChatDetailsQuery(
    { chatId, populate: true },
    { skip: !chatId }
  );

  const {
    excuteMutation: updateGroupNameMutation,
    isLoading: isLoadingGroupName,
  } = useMutation(useRenameGroupMutation);
  const {
    excuteMutation: removeGroupMembers,
    isLoading: isLoadingRemoveMembers,
  } = useMutation(useRemoveGroupMember);
  const {
    excuteMutation: deleteGroupChat,
    isLoading: isLoadingDeleteGroupChat,
  } = useMutation(useDeleteGroupChat);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [groupName, setGroupName] = useState('');
  const [groupNameUpdateValue, setGroupNameUpdatedValue] = useState('');
  const [confirmDeleteDialog, setConfirmDeleteDialog] = useState(false);
  const [groupMembers, setGroupMembers] = useState([]);
  const errors = [
    {
      isError: myGroups.isError,
      error: myGroups.error,
    },
    {
      isError: groupDetails.isError,
      error: groupDetails.error,
    },
  ];

  useErrors(errors);

  useEffect(() => {
    const groupData = groupDetails.data;
    if (groupData) {
      setGroupName(groupData.chat.groupName);
      setGroupNameUpdatedValue(groupData.chat.groupName);
      setGroupMembers(groupData.chat.members);
    }

    return () => {
      setGroupName('');
      setGroupNameUpdatedValue('');
      setGroupMembers([]);
      setIsEdit(false);
    };
  }, [groupDetails.data]);

  const navigateBack = () => {
    navigate('/');
  };

  const handleMobile = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  const handleMobileClose = () => {
    setIsMobileMenuOpen(false);
  };

  const updateGroupName = () => {
    setIsEdit(false);
    updateGroupNameMutation('Updating group Name', {
      chatId,
      name: groupNameUpdateValue,
    });
  };

  const openConfirmDeleteHandler = () => {
    setConfirmDeleteDialog(true);
  };
  const closeConfirmDeleteHandler = () => {
    setConfirmDeleteDialog(false);
  };
  const openAddMemberHandler = () => {
    dispatch(setIsAddMember(true));
  };

  const deleteHandler = () => {
    deleteGroupChat('Deleting Group..', { chatId });
    closeConfirmDeleteHandler();
    navigate('/groups');
  };

  const removeMemberHandler = (id) => {
    removeGroupMembers('Removing member...', { chatId, id });
  };

   useEffect(() => {
     if (chatId) {
       setGroupName(`Group Name ${chatId}`);
       setGroupNameUpdatedValue(`Group Name ${chatId}`);
     }

     return () => {
       setGroupName('');
       setGroupNameUpdatedValue('');
       setIsEdit(false);
     };
   }, [chatId]);

  const IconBtns = (
    <>
      <Box
        sx={{
          display: 'flex',
          xs: 'block',
          sm: 'none',
          position: 'fixed',
          right: '1rem',
          top: '1rem',
        }}
      >
        <IconButton onClick={handleMobile}>
          <MenuIcon />
        </IconButton>
      </Box>

      <Tooltip title="Back">
        <IconButton
          sx={{
            position: 'absolute',
            top: '2rem',
            left: '2rem',
            bgcolor: LIGHT_SKYBLUE_COLOR,
            color: '#ffffff',
            ':hover': {
              bgcolor: '#023e8a',
            },
          }}
          onClick={navigateBack}
        >
          <KeyboardBackspaceIcon />
        </IconButton>
      </Tooltip>
    </>
  );

  const GroupName = (
    <Stack
      direction={'row'}
      alignItems={'center'}
      justifyContent={'center'}
      spacing={'1rem'}
      padding={'3rem'}
    >
      {isEdit ? (
        <>
          <TextField
            value={groupNameUpdateValue}
            onChange={(e) => setGroupNameUpdatedValue(e.target.value)}
          />
          <IconButton onClick={updateGroupName} disabled={isLoadingGroupName}>
            <DoneIcon />
          </IconButton>
        </>
      ) : (
        <>
          <Typography variant="h4">{groupName}</Typography>
          <IconButton
            onClick={() => setIsEdit(true)}
            disabled={isLoadingGroupName}
          >
            <EditIcon />
          </IconButton>
        </>
      )}
    </Stack>
  );

  return myGroups.isLoading ? (
    <LayoutLoader />
  ) : (
    <Grid container height={'100vh'}>
      <Grid
        item
        sx={{ display: { xs: 'none', sm: 'block' } }}
        sm={3}
        bgcolor={GREEN_COLOR}
      >
        <GroupList myGroups={myGroups.data?.groups} chatId={chatId} />
      </Grid>

      <Grid
        item
        xs={12}
        sm={9}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          position: 'relative',
          padding: '1rem 3rem',
        }}
      >
        {IconBtns}

        {groupName && (
          <>
            {GroupName}

            <Typography margin={'1rem 2rem'} alignSelf={'center'} variant="h6">
              Members
            </Typography>

            <Stack
              maxWidth={'45rem'}
              width={'100%'}
              boxSizing={'border-box'}
              padding={{ sm: '1rem', xs: '0', md: '1rem 4rem' }}
              spacing={'2rem'}
              height={'50vh'}
              overflow={'auto'}
            >
              {/* Members */}

              {isLoadingRemoveMembers ? (
                <CircularProgress />
              ) : (
                groupMembers.map((user) => (
                  <UserItem
                    user={user}
                    key={user._id}
                    isAdded
                    style={{
                      boxShadow: `0 0 0.5rem ${TRANSPARENT_BLACK}`,
                      padding: '1rem 2rem',
                      borderRadius: '1rem',
                    }}
                    handler={removeMemberHandler}
                  />
                ))
              )}
            </Stack>

            <ButtonGroup
              openConfirmDeleteHandler={openConfirmDeleteHandler}
              openAddMemberHandler={openAddMemberHandler}
              isLoading={isLoadingDeleteGroupChat}
            />
          </>
        )}
      </Grid>

      {isAddMember && (
        <Suspense fallback={<Backdrop open />}>
          <AddMemberDialog chatId={chatId} />
        </Suspense>
      )}
      {confirmDeleteDialog && (
        <Suspense fallback={<Backdrop open />}>
          <ConfirmDeleteDialog
            open={confirmDeleteDialog}
            handleClose={closeConfirmDeleteHandler}
            deleteHandler={deleteHandler}
            displayMessage={DELETE_GROUP_MSG}
          />
        </Suspense>
      )}
      <Drawer open={isMobileMenuOpen} onClose={handleMobileClose}>
        <GroupList
          w={'50vw'}
          myGroups={myGroups.data?.groups}
          chatId={chatId}
        />
      </Drawer>
    </Grid>
  );
};

const GroupList = ({ w = '100%', myGroups = [], chatId }) => {
  return (
    <Stack width={w} sx={{ maxHeight: '100vh', overflow: 'auto' }}>
      {myGroups.length > 0 &&
        myGroups.map((group) => {
          return (
            <GroupListItem group={group} chatId={chatId} key={group._id} />
          );
        })}
      {myGroups.length === 0 && <Typography> No Groups</Typography>}
    </Stack>
  );
};

const GroupListItem = memo(({ group, chatId }) => {
  const { groupName: name, avatar, _id: id } = group;
  return (
    <Link
      to={`?group=${id}`}
      onClick={(e) => {
        if (chatId === id) e.preventDefault();
      }}
    >
      <Stack direction={'row'} spacing={'1rem'} alignItems={'center'}>
        <AvatarCard avatar={avatar} />
        <Typography>{name}</Typography>
      </Stack>
    </Link>
  );
});

const ButtonGroup = ({ openConfirmDeleteHandler, openAddMemberHandler, isLoading }) => {
  return (
    <Stack
      direction={{ sm: 'row', xs: 'column-reverse' }}
      spacing={'2rem'}
      p={{ xs: '5px', sm: '1rem', md: '1rem 4rem' }}
    >
      {isLoading ? (
        <LoadingButton
          loading
          loadingPosition="start"
          startIcon={<DeleteIcon />}
        >
          Delete Group
        </LoadingButton>
      ) : (
        <Button
          size="large"
          variant="text"
          color="error"
          startIcon={<DeleteIcon />}
          onClick={openConfirmDeleteHandler}
        >
          Delete Group
        </Button>
      )}
      <Button
        size="large"
        variant="contained"
        startIcon={<AddIcon />}
        onClick={openAddMemberHandler}
      >
        Add Member
      </Button>
    </Stack>
  );
};

export default Groups;
