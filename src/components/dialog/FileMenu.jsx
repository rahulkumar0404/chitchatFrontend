import { ListItemText, Menu, MenuItem, MenuList } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setIsFileMenu } from '../../redux/reducers/others';
import {
  Image as ImageIcon,
  AudioFile as AudioFileIcon,
  VideoFile as VideoFileIcon,
  UploadFile as UploadFileIcon,
} from '@mui/icons-material';
import { transformImage } from '../../lib/features';
import {
  setAddFile,
} from '../../redux/reducers/files';
import { setIsDropzoneOpen } from '../../redux/reducers/others.js';
const FileMenu = ({ anchorE1 }) => {
  const dispatch = useDispatch();
  const { isFileMenu } = useSelector((state) => state.others);
  const { selectedDataChat } = useSelector((state) => state.files);
  const [loadedImage, setLoadedImage] = useState([]);
  const closeFileMenuHandler = (value) => {
    dispatch(setIsFileMenu(value));
  };
  const sendButtonHandler = (fileType) => {
    dispatch(setAddFile({ fileType: fileType }));
    dispatch(setIsFileMenu(false));
    dispatch(setIsDropzoneOpen(true));
  };
  return (
    <>
      <Menu
        anchorEl={anchorE1}
        open={isFileMenu}
        onClose={() => closeFileMenuHandler(false)}
      >
        <div style={{ width: '10rem' }}>
          <MenuItem onClick={() => sendButtonHandler('image')}>
            <ImageIcon />
            <ListItemText style={{ marginLeft: '0.5rem' }}>Image</ListItemText>
          </MenuItem>
          <MenuItem onClick={() => sendButtonHandler('audio')}>
            <AudioFileIcon />
            <ListItemText style={{ marginLeft: '0.5rem' }}>Audio</ListItemText>
          </MenuItem>
          <MenuItem onClick={() => sendButtonHandler('video')}>
            <VideoFileIcon />
            <ListItemText style={{ marginLeft: '0.5rem' }}>Video</ListItemText>
          </MenuItem>
          <MenuItem onClick={() => sendButtonHandler('file')}>
            <UploadFileIcon />
            <ListItemText style={{ marginLeft: '0.5rem' }}>Files</ListItemText>
          </MenuItem>
        </div>
      </Menu>
    </>
  );
};

export default FileMenu;

export const loadedData = () => {
  const {} = useSelector();
  return (
    <>
      {loadedImage.map((imageFile, index) => {
        <div>
          <h2>{imageFile.name}</h2>
          <img src={transformImage(imageFile.content)} alt={imageFile.name} />
        </div>;
      })}
    </>
  );
};