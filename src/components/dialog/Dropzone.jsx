import { useCallback, useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import AppLayout from '../layouts/AppLayout';
import {
  RemoveImageButton,
  RemoveRejectedButton,
  RemoveFileButton,
  DialogButtons,
} from '../styles/StyledComponents';
import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  ImageList,
  ImageListItem,
  Menu,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { getFileData } from '../../lib/features';
import {
  setIsDropzoneOpen,
  setUploadingLoader,
} from '../../redux/reducers/others';
import {
  ArrowUpward as ArrowUpwardIcon,
  Clear as ClearIcon,
  Send as SendIcon,
} from '@mui/icons-material';
import { IconButton } from '@mui/material';
import toast from 'react-hot-toast';
import { useSendAttachmentMutation } from '../../redux/api/api';
const thumbsContainer = {
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  marginTop: 16,
};

const thumb = {
  display: 'inline-flex',
  borderRadius: 2,
  border: '1px solid #eaeaea',
  marginBottom: 8,
  marginRight: 8,
  width: 100,
  height: 100,
  padding: 4,
  boxSizing: 'border-box',
};

const thumbInner = {
  display: 'flex',
  minWidth: 0,
  overflow: 'hidden',
};

const img = {
  display: 'block',
  width: 'auto',
  height: '100%',
};

// const CustomDropzone = ({
// maxFileCount,
// maxFileSize,
// fileType,
// open,
// onClose,
// }) => {
//   const onDrop = useCallback((acceptedFiles) => {
//     console.log(acceptedFiles);
//   }, []);

//   const { sendFileType: accept } = useSelector((state) => state.files);
//   const { getRootProps, getInputProps, isDragActive } = useDropzone({
//     fileType: fileType,
//     accept: accept,
//     maxSize: maxFileSize,
//     maxFiles: maxFileCount,
//     onDrop,
//     multiple: true,
//   });
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//   };

//   return (
//     <Box style={{ display: open ? 'block' : 'none', width: '100px', border: '1px solid black' }}>
// <form onSubmit={handleSubmit}>
//   <div {...getRootProps()}>
//     <input {...getInputProps()} />
//     {isDragActive ? (
//       <p>Drop the files ...</p>
//     ) : (
//       <p>
//         Drag '{maxFileCount}' max drop some {accept} here, or click to select {accept}
//       </p>
//     )}
//   </div>
// </form>
//     </Box>
//   );
// };
const CustomDropzone = ({props, anchorEl, chatId}) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const dispatch = useDispatch();
  const { selectedFileType } = useSelector((state) => state.files);
  const { accept, maxFileSize } = getFileData(selectedFileType);
  const [files, setFiles] = useState([]);
  const [error, setError] = useState('');
  const [sendAttachments] = useSendAttachmentMutation();
  const [rejectedFile, setRejectedFile] = useState([]);
  const { isDropzoneOpen } = useSelector((state) => state.others);
  const onDrop = useCallback(
    (acceptedFiles, rejectedFiles) => {
      if (acceptedFiles?.length) {
        if (files.length + acceptedFiles.length > 5) {
          setError('You have reached the limit to send the maximum file.');
          return;
        }
        setFiles((previousFiles) => [
          ...previousFiles,
          ...acceptedFiles.map((file) =>
            Object.assign(file, {
              preview: URL.createObjectURL(file),
            })
          ),
        ]);
        setError('');
      }
      if (rejectedFiles?.length) {
        setRejectedFile((previousFile) => [...previousFile, ...rejectedFiles]);
      }
    },
    [files]
  );
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept,
    maxFiles: 5,
    maxSize: maxFileSize,
    onDrop,
    multiple: true,
  });

  const removeFile = (name) => {
    // setFiles((files) => files.filter((file) => file.name !== name));
    setFiles((prevFiles) => {
      const newFiles = prevFiles.filter((file) => file.name !== name);
      if (newFiles.length <= 5) {
        setError('');
      }
      return newFiles;
    });
  };

  const removeAllFile = () => {
    setFiles([]);
    setError('');
    setRejectedFile([]);
  };

  const removeRejectedFile = (name) => {
    setRejectedFile((files) => files.filter((file) => file.name !== name));
  };

  const thumbs = files.map((file) => (
    <div style={thumb} key={file.name}>
      <div style={thumbInner}>
        <img
          src={file.preview}
          style={img}
          onLoad={() => {
            URL.revokeObjectURL(file.preview);
          }}
        />
      </div>
    </div>
  ));

  useEffect(() => {
    return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
  }, [files]);

  const handleSubmit = async (e, key) => {
    e.preventDefault();
    if (files.length <= 0) return;
    if (files.length > 5) {
      return toast.error('You can only send only 5 file at a time');
    }

    dispatch(setUploadingLoader(true));

    const toastId = toast.loading(`Sending ${key} ...`);
    try {
      const formData = new FormData();
      formData.append('chatId', chatId);
      files.forEach((file) => formData.append('files', file));
      handlerDialogConfirm();
      const res = await sendAttachments(formData);
      if (res.data) {
        toast.success(`${key} sent successfully`, { id: toastId });
      } else {
        toast.error(`Failed to send ${key}`, { id: toastId });
      }
    } catch (error) {
      toast.error(error, { id: toastId });
    } finally {
      dispatch(setUploadingLoader(false));
    }
  };

  const handleDropzoneHandler = (e) => {
    if (files.length > 0) {
      setIsDialogOpen(true);
    } else {
      dispatch(setIsDropzoneOpen(false));
    }
  };

  const handleDialogClose = (e) => {
    setIsDialogOpen(false);
  };

  const handlerDialogConfirm = (e) => {
    setFiles([]);
    setIsDialogOpen(false);
    dispatch(setIsDropzoneOpen(false));
  };
  return (
    <>
      <Menu
        className="container"
        anchorEl={anchorEl}
        open={isDropzoneOpen}
        onClose={handleDropzoneHandler}
        PaperProps={{ sx: { height: '1050px', width: '700px' } }}
      >
        <form onSubmit={handleSubmit}>
          <div {...getRootProps({ className: 'dropzone' })}>
            <input {...getInputProps()} />
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '1rem',
              }}
            >
              <ArrowUpwardIcon
                style={{ width: '1rem', height: '1rem', fill: 'currentcolor' }}
              />
              {isDragActive ? (
                <p>Drop the files ...</p>
              ) : (
                <p>Drag '5' max drop some here, or click to select</p>
              )}
            </div>
          </div>

          <section style={{ margin: '3rem 1rem 0 1rem', position: 'relative' }}>
            {/* Preview */}
            <div
              style={{
                display: 'flex',
                gap: '2rem',
                justifyContent: 'space-between',
              }}
            >
              <h2 style={{ fontSize: '1rem', fontWeight: '600' }}>Preview</h2>
              <RemoveImageButton type="button" onClick={removeAllFile}>
                Remove all Files
              </RemoveImageButton>
            </div>

            {/* Accepted Files */}
            <h3
              style={{
                fontSize: '17px',
                fontWeight: '500',
                color: 'rgb(87, 83, 78)',
                marginTop: '1.25rem',
                borderBottom: '1px',
                paddingBottom: '0.75rem',
              }}
            >
              Accepted Files
            </h3>
            <ul
              style={{
                marginTop: '1rem',
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '2rem',
              }}
            >
              {files.map((file) => (
                <li
                  key={file.name}
                  style={{
                    listStyle: 'none',
                    position: 'relative',
                    height: '6rem',
                    width: '8rem',
                    borderRadius: '0.375rem',
                    boxShadow:
                      '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
                  }}
                >
                  <ImageListItem
                    style={{
                      width: 100,
                      height: 100,
                      borderRadius: '8px',
                      overflow: 'hidden',
                    }}
                  >
                    <img
                      srcSet={file.preview}
                      src={file.preview}
                      alt={file.name}
                      loading="lazy"
                      onLoad={() => {
                        URL.revokeObjectURL(file.preview);
                      }}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'contain',
                        borderRadius: '25px',
                      }}
                    />
                  </ImageListItem>
                  <RemoveFileButton
                    type="button"
                    onClick={() => removeFile(file.name)}
                    sx={{ backgroundColor: '#cad2c5' }}
                  >
                    <ClearIcon
                      style={{
                        color: '#495057',
                        '&:hover': {
                          color: '#3490dc',
                          TransitionEvent: 'fill 0.3 ease',
                        },
                      }}
                    />
                  </RemoveFileButton>
                  <p
                    style={{
                      marginTop: '0.5rem',
                      color: 'rgb(115,115,115)',
                      fontWeight: '500',
                      fontSize: '12px',
                    }}
                  >
                    {file.name}
                  </p>
                </li>
              ))}
            </ul>

            {/* Rejected Files */}

            {/* <h3
              style={{
                fontSize: ' 1.125rem',
                fontWeight: '600',
                color: '#525252',
                marginTop: '2rem',
                borderBottom: '1px solid #e5e7eb',
                paddingBottom: '0.75rem',
              }}
            >
              Rejected Files
            </h3>
            <ul
              style={{
                marginTop: '1rem',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              {rejectedFile.map(({ file, errors }) => (
                <li key={file.name}>
                  <div>
                    <p>{file.name}</p>
                    <ul
                      style={{
                        fontSize: '12px',
                        color: 'red',
                      }}
                    >
                      {errors.map((error) => (
                        <li key={error.code}>{error.message}</li>
                      ))}
                    </ul>
                  </div>
                  <RemoveRejectedButton
                    type="button"
                    onClick={() => removeRejectedFile(file.name)}
                  >
                    remove
                  </RemoveRejectedButton>
                </li>
              ))}
            </ul> */}

            {error && (
              <p style={{ color: 'red', paddingTop: '9px' }}>{error}</p>
            )}
            <IconButton
              type="submit"
              sx={{
                position: 'absolute',
                bottom: '-2rem',
                right: '1rem',
                rotate: '-10deg',
                color: '#ffffff',
                bgcolor: '#00b4d8',
                marginLeft: '1rem',
                padding: '0.5rem',
                '&:hover': {
                  bgcolor: '#023e8a',
                  transition: '0.5s ease-in-out',
                },
                ':disabled': { bgcolor: '#ccc' },
              }}
              disabled={files.length <= 0 || files.length > 5}
              onClick={(e) => handleSubmit(e, selectedFileType)}
            >
              <SendIcon />
            </IconButton>
          </section>
        </form>
      </Menu>
      <DialogOnClose
        open={isDialogOpen}
        onClose={handleDialogClose}
        onConfirm={handlerDialogConfirm}
      />
    </>
  );
};

export default CustomDropzone;

const DialogOnClose = ({ open, onClose, onConfirm }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle sx={{ font: '500 1.5rem sans-serif, serif' }}>
        Discard unsent message?
      </DialogTitle>
      <DialogContent>
        <DialogContentText sx={{ font: '400 13px/15px sans-serif,serif' }}>
          Your message,including attached file will not be sent if you leave the
          screen
        </DialogContentText>
      </DialogContent>
      <DialogActions
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          margin: '0 10px',
          boxShadow: 'rgba(0, 0, 0, 0.15) 0 0 1.95px',
          height: '3rem',
        }}
      >
        <DialogButtons
          sx={{ backgroundColor: 'rgb(0, 104, 74)', color: '#ffffff' }}
          onClick={onConfirm}
        >
          Discard
        </DialogButtons>
        <DialogButtons onClick={onClose}>Return to media</DialogButtons>
      </DialogActions>
    </Dialog>
  );
};
