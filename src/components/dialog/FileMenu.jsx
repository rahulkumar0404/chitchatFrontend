import { Menu } from '@mui/icons-material';
import React from 'react';

const FileMenu = ({ anchorE1 }) => {
  return (
    <Menu anchorE1={anchorE1} open={false}>
      <div style={{ width: '10rem' }}>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Doloremque
        delectus voluptate natus ab quod! Exercitationem, odit. Quod cupiditate
        aperiam explicabo eligendi placeat nam excepturi illum error ullam
        distinctio, et omnis.
      </div>
    </Menu>
  );
};

export default FileMenu;
