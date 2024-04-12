import { memo } from 'react';
import moment from 'moment';
import { Typography, Box } from '@mui/material';
import { fileFormat } from '../../lib/features';
import { LIGHT_BLUE_COLOR, BLUE_COLOR } from '../../constants/color';
import RenderAttachment from './RenderAttachment';
const MessageComponent = ({ message, user }) => {
  const { sender, content, attachments = [], createdAt } = message;
  const { _id: id } = sender;
  const sameSender = id === user.id;

  const timeAgo = moment(createdAt).fromNow();
  return (
    <div
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
              <a
                href={url}
                target="_blank"
                download
                style={{
                  color: '#000000',
                }}
              >
                {RenderAttachment(file, url)}
              </a>
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
    </div>
  );
};

export default memo(MessageComponent);
