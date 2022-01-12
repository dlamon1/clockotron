export const formatTime = (time, positions) => {
  let timeArray = [];
  timeArray.push(Math.floor(time / 3600));
  timeArray.push(Math.floor((time / 60) % 60));
  timeArray.push(time % 60);
  let formatedTime = '';
  if (positions >= 3) {
    formatedTime = formatedTime + add0(timeArray[0]) + ':';
  }
  if (positions >= 2) {
    formatedTime = formatedTime + add0(timeArray[1]) + ':';
  }
  if (positions >= 1) {
    formatedTime = formatedTime + add0(timeArray[2]);
  }

  function add0(time) {
    let y;
    let l = String(time).split('');
    switch (l.length) {
      case 0:
        y = '00';
        break;
      case 1:
        y = '0' + String(time);
        break;
      case 2:
        y = String(time);
        break;
      default:
        break;
    }
    return y;
  }
  return formatedTime;
};
