import moment from 'moment';
const fileFormat = (url = '') => {
  const fileExt = url.split('.').pop();

  if (fileExt === 'mp4' || fileExt === 'webm' || fileExt === 'ogg')
    return 'video';
  if (fileExt === 'mp3' || fileExt === 'wav') return 'audio';
  if (
    fileExt === 'png' ||
    fileExt === 'gif' ||
    fileExt === 'jpg' ||
    fileExt === 'jpeg'
  )
    return 'image';
  return 'file';
};

const transformImage = (url = '', width = 100) => {
  if (url && url.includes('upload/')) {
    const newUrl = url.replace('upload/', `upload/dpr_auto/w_${width}/`);
    return newUrl;
  }
  return url;
};

const getLast7Days = () => {
  const currentDate = moment();
  const last7Days = [];
  for (let i = 0; i < 7; i++) {
    const dayDate = currentDate
      .clone()
      .subtract(i, 'days')
      .format('DD/MM/YYYY H:MM:SS');
    last7Days.unshift(dayDate);
  }

  return last7Days;
};

const getFileData = (selectedFileType) => {
  let accept,
    maxFileSize,
    maxFileCount = 5;

  switch (selectedFileType) {
    case 'image':
      accept = { 'image/*': ['.png', '.jpeg', '.gif'] };
      maxFileSize = 2 * 1024 * 1024;
      break;
    case 'audio':
      accept = { 'audio/*': ['.mp3', '.ogg', '.wav', '.webm'] };
      maxFileSize = 5 * 1024 * 1024;
      break;
    case 'video':
      accept = { 'video/*': ['.mp4', '.webm'] };
      maxFileSize = 10 * 1024 * 1024;
      break;
    case 'file':
      accept = '*';
      maxFileSize = 10 * 1024 * 1024;
      break;
    default:
      accept = '/';
      maxFileSize: 2 * 1024 * 1024;
  }
  return {
    accept,
    maxFileSize,
    maxFileCount,
  };
};

const getOrSaveFromStorage = ({ key, value, get }) => {
  if (get)
    return localStorage.getItem(key)
      ? JSON.parse(localStorage.getItem(key))
      : null;
  else localStorage.setItem(key, JSON.stringify(value));
};

export {
  fileFormat,
  transformImage,
  getLast7Days,
  getFileData,
  getOrSaveFromStorage,
};
