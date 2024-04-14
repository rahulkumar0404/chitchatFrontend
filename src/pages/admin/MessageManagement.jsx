import { Avatar, Box, Stack, Typography } from '@mui/material';
import moment from 'moment';
import { useEffect, useState } from 'react';
import AdminLayout from '../../components/layouts/AdminLayout.jsx';
import RenderAttachment from '../../components/shared/RenderAttachment.jsx';
import Table from '../../components/shared/Table.jsx';
import { dashboardData } from '../../constants/sampleData.js';
import { fileFormat, transformImage } from '../../lib/features.js';
const columns = [
  {
    field: 'id',
    headerName: 'ID',
    headerClassName: 'table-header',
    width: 200,
  },
  {
    field: 'attachment',
    headerName: 'Attachments',
    headerClassName: 'table-header',
    width: 200,
    renderCell: (params) => {
      const { attachments } = params.row;

      return attachments.length > 0 ? (
        attachments.map((attachment) => {
          const url = attachment.url;
          const file = fileFormat(url);
          return (
            <Box key={attachment.public_id}>
              <a
                href={url}
                download
                target="_blank"
                style={{
                  color: '#000000',
                }}
              >
                {RenderAttachment(file, url)}
              </a>
            </Box>
          );
        })
      ) : (
        <Typography>No Attachment</Typography>
      );
    },
  },
  {
    field: 'content',
    headerName: 'Content',
    headerClassName: 'table-header',
    width: 400,
  },
  {
    field: 'sender',
    headerName: 'Sent By',
    headerClassName: 'table-header',
    width: 200,
    renderCell: (params) => (
      <Stack direction={'row'} spacing={'1rem'} alignItems={'center'}>
        <Avatar alt={params.row.name} src={params.row.avatar} />
        <span>{params.row.sender.name}</span>
      </Stack>
    ),
  },
  {
    field: 'chat',
    headerName: 'Chat',
    headerClassName: 'table-header',
    width: 200,
  },
  {
    field: 'groupChat',
    headerName: 'Group Chat',
    headerClassName: 'table-header',
    width: 200,
    renderCell: (params) => (params.row.groupChat === true ? 'Yes' : 'No'),
  },
  {
    field: 'createdAt',
    headerName: 'Time',
    headerClassName: 'table-header',
    width: 200,
  },
];

const MessageManagement = () => {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    setRows(
      dashboardData.messages.map((message) => ({
        ...message,
        id: message._id,
        sender: {
          name: message.sender.name,
          avatar: transformImage(message.sender.name, 50),
        },
        createdAt: moment(message.createdAt).format('DD/MM/YYYY'),
      }))
    );
  }, []);
  return (
    <AdminLayout>
      <Table
        heading={'All Messages'}
        columns={columns}
        rows={rows}
        rowHeight={200}
      />
    </AdminLayout>
  );
};

export default MessageManagement;
