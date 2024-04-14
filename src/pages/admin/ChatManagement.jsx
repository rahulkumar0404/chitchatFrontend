import { Avatar, Stack } from '@mui/material';
import React, { useEffect, useState } from 'react';
import AdminLayout from '../../components/layouts/AdminLayout.jsx';
import AvatarCard from '../../components/shared/AvatarCard.jsx';
import Table from '../../components/shared/Table.jsx';
import { dashboardData } from '../../constants/sampleData.js';
import { transformImage } from '../../lib/features.js';

const columns = [
  {
    field: 'id',
    headerName: 'ID',
    headerClassName: 'table-header',
    width: 200,
  },
  {
    field: 'avatar',
    headerName: 'Group Image',
    headerClassName: 'table-header',
    width: 150,
    renderCell: (params) => (
      <AvatarCard alt={params.row.name} avatar={params.row.avatar} />
    ),
  },
  {
    field: 'name',
    headerName: 'Name',
    headerClassName: 'table-header',
    width: 300,
  },
  {
    field: 'totalMembers',
    headerName: 'Total Members',
    headerClassName: 'table-header',
    width: 100,
  },
  {
    field: 'members',
    headerName: 'Members',
    headerClassName: 'table-header',
    width: 300,
    renderCell: (params) => (
      <AvatarCard max={100} avatar={params.row.members} />
    ),
  },
  {
    field: 'totalMessages',
    headerName: 'Total Messages',
    headerClassName: 'table-header',
    width: 100,
  },
  {
    field: 'creator',
    headerName: 'Created By',
    headerClassName: 'table-header',
    width: 200,
    renderCell: (params) => (
      <Stack direction="row" alignItems={'center'} spacing={'2rem'}>
        <Avatar alt={params.row.creator.name} src={params.row.creator.avatar} />
        <span>{params.row.creator.name}</span>
      </Stack>
    ),
  },
];
const ChatManagement = () => {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    setRows(
      dashboardData.chats.map((chat) => ({
        ...chat,
        avatar: chat.avatar.map((avatar) => transformImage(avatar, 50)),
        id: chat._id,
        members: chat.members.map((member) =>
          transformImage(member.avatar, 50)
        ),
        creator: {
          name: chat.creator.name,
          avatar: transformImage(chat.creator.avatar, 50),
        },
      }))
    );
  }, []);
  return (
    <AdminLayout>
      <Table heading={'All Chats'} columns={columns} rows={rows} />
    </AdminLayout>
  );
};

export default ChatManagement;
