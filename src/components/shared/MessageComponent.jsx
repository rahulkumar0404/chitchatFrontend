import { memo, useRef } from 'react';
import moment from 'moment';
import { Typography, Box, Button } from '@mui/material';
import { fileFormat } from '../../lib/features';
import { LIGHT_BLUE_COLOR, BLUE_COLOR } from '../../constants/color';
import RenderAttachment from './RenderAttachment';
import { useIsGroupChat } from '../../redux/api/api';
import { motion } from 'framer-motion';
const MessageComponent = ({ message, user }) => {
  const {
    sender,
    content,
    attachment: attachments = [],
    createdAt,
    chat: chatId,
  } = message;
  // const { isLoading, data, error } = useIsGroupChat(chatId);
  const { _id: id } = sender;
  const sameSender = id === user._id;
  const timeAgo = moment(createdAt).fromNow();
  const downloadLinkRef = useRef(null);

  // const isNameShow = data && ((data.isGroupChat && !sameSender) || !sameSender);
  const imageDownload = (url) => {
    fetch(url)
      .then((response) => response.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(new Blob([blob]));
        const link = document.createElement('a');
        link.href = url;
        link.download = 'image.png';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      })
      .catch((error) => console.log('error', error.message));
  };
  return (
    <motion.div
      initial={{ opacity: 0, x: '-100%' }}
      whileInView={{ opacity: 1, x: 0 }}
      style={{
        alignSelf: sameSender ? 'flex-end' : 'flex-start',
        backgroundColor: sameSender ? BLUE_COLOR : 'white',
        color: sameSender ? 'white' : 'black',
        borderRadius: '5px',
        padding: '0.5rem',
        width: 'fit-content',
      }}
    >
      {!sameSender && (
        <Typography
          color={LIGHT_BLUE_COLOR}
          fontWeight={'600'}
          variant="caption"
        >
          {sender.name}
        </Typography>
      )}

      {content && <Typography> {content}</Typography>}

      {attachments.length > 0 &&
        attachments.map((attachment, index) => {
          const url = attachment.url;
          const file = fileFormat(url);
          return (
            <Box key={index}>
              <Button
                onClick={(e) => imageDownload(url)}
                style={{ color: '#000000', display: 'block' }}
              >
                {RenderAttachment(file, url)}
              </Button>
            </Box>
          );
        })}
      <Typography
        variant="caption"
        color={sameSender ? '#fafafa' : '#757575'}
        sx={{ float: 'right' }}
      >
        {timeAgo}
      </Typography>
    </motion.div>
  );
};

export default memo(MessageComponent);
