import { Stack } from '@mui/material';
import ChatItem from '../shared/ChatItem';
const ChatList = ({
  w = '100%',
  chats,
  chatId,
  onlineUsers = [],
  newMessagesAlert = [{ chatId: '', count: 0 }],
  handleDeleteChat,
}) => {
  return (
    <Stack width={w} direction={'column'} overflow={'auto'} height={'100%'}>
      {chats.map((data, index) => {
        const { avatar, _id: id, groupName: name, groupChat, members } = data;
        const newMessageAlert = newMessagesAlert.find(
          ({ chatId }) => chatId === id
        );

        const isOnline = members.some((member) => onlineUsers.includes(id));
        return (
          <ChatItem
            index={chatId}
            newMessageAlert={newMessageAlert}
            isOnline={isOnline}
            avatar={avatar}
            name={name}
            id={id}
            key={id}
            groupChat={groupChat}
            sameSender={chatId === id}
            handleDeleteChat={handleDeleteChat}
          />
        );
      })}
    </Stack>
  );
};

export default ChatList;
