export const formatTime = (x) => {
  let time = [];
  time.push(Math.floor(x / 3600));
  time.push(Math.floor((x / 60) % 60));
  time.push(x % 60);
  let timePrint = add0(time[0]) + ':' + add0(time[1]) + ':' + add0(time[2]);

  function add0(x) {
    let y;
    let l = String(x).split('');
    switch (l.length) {
      case 0:
        y = '00';
        break;
      case 1:
        y = '0' + String(x);
        break;
      case 2:
        y = String(x);
        break;
      default:
        break;
    }
    return y;
  }
  return timePrint;
};
