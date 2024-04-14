import React, { useEffect, useState } from 'react';
import AdminLayout from '../../components/layouts/AdminLayout.jsx';
import Table from '../../components/shared/Table.jsx';
import { Avatar } from '@mui/material';
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
    headerName: 'Avatar',
    headerClassName: 'table-header',
    width: 150,
    renderCell: (params) => (
      <Avatar alt={params.row.name} src={params.row.avatar} />
    ),
  },
  {
    field: 'name',
    headerName: 'Name',
    headerClassName: 'table-header',
    width: 200,
  },
  {
    field: 'email',
    headerName: 'Email',
    headerClassName: 'table-header',
    width: 200,
  },
  {
    field: 'username',
    headerName: 'Username',
    headerClassName: 'table-header',
    width: 100,
  },
  {
    field: 'friends',
    headerName: 'Friends',
    headerClassName: 'table-header',
    width: 100,
  },
  {
    field: 'groups',
    headerName: 'Groups',
    headerClassName: 'table-header',
    width: 100,
  },
  {
    field: 'createdAt',
    headerName: 'Created At',
    headerClassName: 'table-header',
    width: 100,
  },
];
const UserManagement = () => {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    setRows(
      dashboardData.users.map((user) => ({
        ...user,
        avatar: transformImage(user.avatar, 50),
        id: user._id,
      }))
    );
  }, []);
  return (
    <AdminLayout>
      <Table heading={'All Users'} columns={columns} rows={rows} />
    </AdminLayout>
  );
};

export default UserManagement;
