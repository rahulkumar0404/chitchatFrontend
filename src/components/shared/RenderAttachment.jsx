import { FileOpen as FileOpenIcon } from '@mui/icons-material';
import { transformImage } from '../../lib/features';
const RenderAttachment = ( file, url ) => {
  console.log(file);
  switch (file) {
    case 'video':
      return <video src={url} preload="none" width={'200px'} controls />;
    case 'audio':
      return <audio src={url} preload="none" controls />;
    case 'image':
      return (
        <img
          src={transformImage(url, 200)}
          alt="Attachments"
          width={'200px'}
          height={'150px'}
          style={{ objectFit: 'contain' }}
        />
      );

    default:
      <FileOpenIcon />;
  }
};

export default RenderAttachment;
