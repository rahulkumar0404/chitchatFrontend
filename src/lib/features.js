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
export { fileFormat, transformImage, getLast7Days };
