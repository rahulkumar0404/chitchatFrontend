import { Container, Paper, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import React from 'react';
import { LIGHT_BLACK_COLOR, WHITE_COLOR } from '../../constants/color';
const Table = ({ rows, columns, heading, rowHeight = 52 }) => {
  return (
    <Container sx={{ height: '100vh' }}>
      <Paper
        elevation={3}
        sx={{
          padding: '1rem 4rem',
          borderRadius: '1rem',
          margin: 'auto',
          width: '100%',
          overflow: 'hidden',
          height: '100%',
          boxShadow: 'none',
        }}
      >
        <Typography textAlign={'center'} variant="h4">
          {heading}
        </Typography>
        <DataGrid
          rows={rows}
          columns={columns}
          rowHeight={rowHeight}
          style={{ height: '80%' }}
          sx={{
            border: 'none',
            '.table-header': { bgcolor: LIGHT_BLACK_COLOR, color: WHITE_COLOR },
          }}
        />
      </Paper>
    </Container>
  );
};

export default Table;
