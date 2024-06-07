import { useCallback, useEffect, useRef, useState } from 'react';
import AppLayout from '../components/layouts/AppLayout.jsx';
import { Stack, IconButton, Button, Skeleton, Box } from '@mui/material';
import {
  AttachFile as AttachFileIcon,
  Send as SendIcon,
} from '@mui/icons-material';
import FileMenu from '../components/dialog/FileMenu.jsx';
import { InputBox } from '../components/styles/StyledComponents.jsx';
import { BLUE_COLOR, GRAY_COLOR } from '../constants/color.js';
import MessageComponent from '../components/shared/MessageComponent.jsx';
import { useSocket } from '../socket.jsx';
import CHAT_WINDOW_IMAGE from '../assets/ChatWindowImage.jpg';
import { NEW_MESSAGE, START_TYPING, STOP_TYPING, ALERT } from '../constants/event.js';
import { useInfiniteScrollTop } from '6pp';
import {
  useGetChatDetailsQuery,
  useGetMessageQuery,
} from '../redux/api/api.js';
import { useErrors, useSocketEvent } from '../hooks/hook.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { setIsFileMenu, setIsDropzoneOpen } from '../redux/reducers/others.js';
import CustomDropzone from '../components/dialog/Dropzone.jsx';
import { removeNewMessagesAlert } from '../redux/reducers/chat.js';
import { TypingLoader } from '../components/layouts/Loaders.jsx';
import { useNavigate } from 'react-router';
const Chat = ({ chatId }) => {
  const socket = useSocket();
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [page, setPage] = useState(1);
  const [fileMenuAnchor, setFileMenuAnchor] = useState(null);
  const [IAmTyping, setIAmTyping] = useState(false);
  const [userTyping, setUserTyping] = useState(false);
  const typingTimeout = useRef(null);
  const { isDropzoneOpen } = useSelector((state) => state.others);
  const containerRef = useRef(null);
  const bottomRef = useRef(null);
  const { user } = useSelector((state) => state.auth);
  const chatDetails = useGetChatDetailsQuery({ chatId, skip: !chatId });
  const oldMessagesData = useGetMessageQuery({ chatId, page });
  const members = chatDetails.data?.chat?.members;
  const { data: oldMessage, setData: setOldMessage } = useInfiniteScrollTop(
    containerRef,
    oldMessagesData.data?.totalPages,
    page,
    setPage,
    oldMessagesData.data?.messages
  );
  const errors = [
    { isError: chatDetails.isError, error: chatDetails.error },
    { isError: oldMessagesData.isError, error: oldMessagesData.error },
  ];
  const messageChangeHandler = (e) => {
    setMessage(e.target.value);
    if (!IAmTyping) {
      socket.emit(START_TYPING, { members, chatId });
      setIAmTyping(true);
    }

    if (typingTimeout.current) clearTimeout(typingTimeout.current);

    typingTimeout.current = setTimeout(() => {
      socket.emit(STOP_TYPING, { members, chatId });
      setIAmTyping(false);
    }, [2000]);
  };

  const handleFileOpen = (e) => {
    dispatch(setIsFileMenu(true));
    dispatch(setIsDropzoneOpen(false));
    setFileMenuAnchor(e.currentTarget);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    socket.emit(NEW_MESSAGE, { chatId, members, message });
    setMessage('');
  };

  useEffect(() => {
    dispatch(removeNewMessagesAlert(chatId));
    return () => {
      setMessages([]);
      setPage(1);
      setMessage('');
      setOldMessage([]);
    };
  }, [chatId]);

  useEffect(() => {
    if (bottomRef.current)
      bottomRef.current.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(()=>{
    if(chatDetails.isError) return navigate("/")
  }, [chatDetails.isError])

  const handleNewMessageListener = useCallback(
    (data) => {
      if (data.chatId !== chatId) return;
      setMessages((prev) => [...prev, data.message]);
    },
    [chatId]
  );

  const startTypingListener = useCallback(
    (data) => {
      if (data.chatId !== chatId) return;
      setUserTyping(true);
    },
    [chatId]
  );
  const stopTypingListener = useCallback(
    (data) => {
      if (data.chatId !== chatId) return;
      setUserTyping(false);
    },
    [chatId]
  );

  const alertListener = useCallback(
    (data) => {
      const messageForAlert = {
        content: data,
        sender: {
          _id: Math.random() * 100,
          name: `Admin`,
        },
        chat: chatId,
        createdAt: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, messageForAlert]);
    },
    [chatId]
  );
  const eventHandler = {
    [ALERT]: alertListener,
    [NEW_MESSAGE]: handleNewMessageListener,
    [START_TYPING]: startTypingListener,
    [STOP_TYPING]: stopTypingListener,
  };
  useSocketEvent(socket, eventHandler);
  useErrors(errors);

  const allMessages = [...oldMessage, ...messages];
  return chatDetails.isLoading ? (
    <Skeleton />
  ) : (
    <div
      style={{
        position: 'relative',
        height: '100%',
      }}
    >
      <Stack
        ref={containerRef}
        boxSizing={'border-box'}
        padding={'1rem'}
        spacing={'1rem'}
        bgcolor={'rgba(78,45,45,0.1)'}
        height={'90%'}
        sx={{
          overflowX: 'hidden',
          overflowY: 'auto',
          zIndex: 10,
        }}
      >
        {allMessages.map((message) => (
          <MessageComponent message={message} user={user} key={message._id} />
        ))}

        {userTyping && <TypingLoader />}
        <div ref={bottomRef} />
      </Stack>
      <form onSubmit={handleSubmit} style={{ height: '10%' }}>
        <Stack
          direction={'row'}
          height={'100%'}
          padding={'11px'}
          alignItems={'center'}
          position={'relative'}
        >
          <IconButton
            type="button"
            sx={{ position: 'absolute', left: '1.5rem', rotate: '30deg' }}
            onClick={handleFileOpen}
          >
            <AttachFileIcon />
          </IconButton>

          <InputBox
            placeholder="Type a message"
            value={message}
            onChange={messageChangeHandler}
          />
          <IconButton
            type="submit"
            onClick={handleSubmit}
            sx={{
              rotate: '-10deg',
              bgcolor: BLUE_COLOR,
              color: '#ffffff',
              marginLeft: '1rem',
              padding: '0.5rem',
              '&:hover': { bgcolor: 'primary.dark' },
            }}
          >
            <SendIcon />
          </IconButton>
        </Stack>
      </form>

      <FileMenu anchorE1={fileMenuAnchor} chatId={chatId} />
      <CustomDropzone anchorE1={fileMenuAnchor} chatId={chatId} />
    </div>
  );
};

export default AppLayout()(Chat);
