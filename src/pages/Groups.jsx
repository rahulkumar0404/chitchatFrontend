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
} from '@mui/material';
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
import { sampleChats, sampleUsers } from '../constants/sampleData.js';
import { DELETE_GROUP_MSG } from '../constants/constants.js';
import UserItem from '../components/shared/UserItem.jsx';
const ConfirmDeleteDialog = lazy(() =>
  import('../components/dialog/ConfirmDeleteDialog.jsx')
);

const AddMemberDialog = lazy(() =>
  import('../components/dialog/AddMemberDialog.jsx')
);
const Groups = () => {
  const navigate = useNavigate();
  const chatId = useSearchParams()[0].get('group');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [groupName, setGroupName] = useState('');
  const [groupNameUpdateValue, setGroupNameUpdatedValue] = useState('');
  const [confirmDeleteDialog, setConfirmDeleteDialog] = useState(false);
  const isAddMember = false;
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
    console.log(groupNameUpdateValue);
  };

  const openConfirmDeleteHandler = () => {
    setConfirmDeleteDialog(true);
    console.log('delete confirm');
  };
  const closeConfirmDeleteHandler = () => {
    setConfirmDeleteDialog(false);
    console.log('delete dialog close');
  };
  const openAddMemberHandler = () => {
    console.log('member added confirm');
  };

  const deleteHandler = () => {
    console.log('delete Handler');
    setConfirmDeleteDialog(false);
  };

  const removeMemberHandler = (id) => {
    console.log(id);
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
          <IconButton onClick={updateGroupName}>
            <DoneIcon />
          </IconButton>
        </>
      ) : (
        <>
          <Typography variant="h4">{groupName}</Typography>
          <IconButton onClick={() => setIsEdit(true)}>
            <EditIcon />
          </IconButton>
        </>
      )}
    </Stack>
  );

  return (
    <Grid container height={'100vh'}>
      <Grid
        item
        sx={{ display: { xs: 'none', sm: 'block' } }}
        sm={3}
        bgcolor={GREEN_COLOR}
      >
        <GroupList myGroups={sampleChats} chatId={chatId} />
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

            <Typography
              margin={'1rem 2rem'}
              alignSelf={'center'}
              variant="h6"
            >
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

              {sampleUsers.map((user) => (
                <UserItem
                  user={user}
                  key={user.id}
                  isAdded
                  style={{
                    boxShadow: `0 0 0.5rem ${TRANSPARENT_BLACK}`,
                    padding: '1rem 2rem',
                    borderRadius: '1rem',
                  }}
                  handler={removeMemberHandler}
                />
              ))}
            </Stack>

            <ButtonGroup
              openConfirmDeleteHandler={openConfirmDeleteHandler}
              openAddMemberHandler={openAddMemberHandler}
            />
          </>
        )}
      </Grid>

      {isAddMember && (
        <Suspense fallback={<Backdrop open />}>
          <AddMemberDialog />
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
        <GroupList w={'50vw'} myGroups={sampleChats} chatId={chatId} />
      </Drawer>
    </Grid>
  );
};

const GroupList = ({ w = '100%', myGroups = [], chatId }) => {
  return (
    <Stack width={w} sx={{ maxHeight: '100vh', overflow: 'auto' }}>
      {myGroups.length > 0 &&
        myGroups.map((group) => {
          return <GroupListItem group={group} chatId={chatId} key={group.id} />;
        })}
      {myGroups.length === 0 && <Typography> No Groups</Typography>}
    </Stack>
  );
};

const GroupListItem = memo(({ group, chatId }) => {
  const { name, avatar, id } = group;
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

const ButtonGroup = ({ openConfirmDeleteHandler, openAddMemberHandler }) => {
  return (
    <Stack
      direction={{ sm: 'row', xs: 'column-reverse' }}
      spacing={'2rem'}
      p={{ xs: '5px', sm: '1rem', md: '1rem 4rem' }}
    >
      <Button
        size="large"
        variant="text"
        color="error"
        startIcon={<DeleteIcon />}
        onClick={openConfirmDeleteHandler}
      >
        Delete Group
      </Button>
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

// const GroupName = () => {
//   const [isEdit, setIsEdit] = useState(false);
//   const updateGroupName = () => {
//     setIsEdit(false);
//     console.log(groupNameUpdateValue);
//   };
//   return (
//     <Stack
//       direction={'row'}
//       alignItems={'center'}
//       justifyContent={'center'}
//       spacing={'1rem'}
//       padding={'3rem'}
//     >
//       {isEdit ? (
//         <>
//           <TextField
//             value={groupNameUpdateValue}
//             onChange={(e) => setGroupNameUpdatedValue(e.target.value)}
//           />
//           <IconButton onClick={updateGroupName}>
//             <DoneIcon />
//           </IconButton>
//         </>
//       ) : (
//         <>
//           <Typography variant="h4">{groupName}</Typography>
//           <IconButton onClick={() => setIsEdit(true)}>
//             <EditIcon />
//           </IconButton>
//         </>
//       )}
//     </Stack>
//   );
// };

export default Groups;
