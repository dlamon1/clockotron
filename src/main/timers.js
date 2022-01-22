import { ipcMain, session } from 'electron';

export class Timers {
  timer;
  videoTimer;
  mainWindow;
  listener;
  constructor(mainWindow) {
    this.mainWindow = mainWindow;
    this.addTimer();
  }

  addTimer() {
    let timer = new Timer('timer', this.mainWindow);
    this.timer = timer;
  }

  addVideoTimer() {
    let timer = new Timer('videoTimer', this.mainWindow);
    this.videoTimer = timer;
  }
}

class Timer {
  id;
  interval;
  startSeconds;
  timeout;
  expected;
  mainWindow;
  currentSeconds;
  drifts = [];
  milliseconds = [];
  initialMilliseconds;
  startListenerVar;
  directionIsDown = true;
  countsUpAfterDown = false;
  upAfterDown = false;

  constructor(id, mainWindow) {
    this.id = id;
    this.mainWindow = mainWindow;
  }

  start() {
    if (this.directionIsDown) {
      this.sendTimerData(this.id, this.currentSeconds - 1);
      this.currentSeconds += -1;
    } else {
      this.sendTimerData(this.id, this.currentSeconds + 1);
      this.currentSeconds += 1;
    }
    this.expected = Date.now() + this.interval;
    this.timeout = setTimeout(this.session.bind(this), this.interval);
  }

  stop() {
    clearTimeout(this.timeout);
  }

  session() {
    let drift = Date.now() - this.expected;
    // this.drifts.push(drift);
    // if (this.drifts.length > 10) this.drifts.shift();
    if (drift > this.interval) {
      //figure this out, probably just reset to original interval
      drift = 0;
      clearTimeout(this.timeout);
      console.log('error drive > this.interval');
    }
    if (this.directionIsDown) {
      this.currentSeconds += -1;
    } else {
      this.currentSeconds += 1;
    }
    this.sendTimerData(this.id, this.currentSeconds);
    // const d = new Date();
    // let ms = d.getMilliseconds();
    // this.milliseconds.push(ms);
    // let total = 0;
    // let totalMilli = 0;
    // this.drifts.forEach((drift) => {
    //   total += drift;
    // });
    // this.milliseconds.forEach((m) => (totalMilli += m));
    // let medianDrift;
    // if (this.drifts % 2 == 0) {
    //   medianDrift = this.drifts[this.drifts.length / 2];
    // } else {
    //   medianDrift = this.drifts[(this.drifts.length - 1) / 2];
    // }
    // let averageDrift = total / this.drifts.length;
    // let averageMilli = totalMilli / this.milliseconds.length;
    // console.log('avg mill: ', averageMilli);
    // console.log('                              avg drift: ', averageDrift);
    this.expected += this.interval;

    this.timeout = setTimeout(this.session.bind(this), this.interval - drift);
  }

  sendTimerData(id, currentSeconds) {
    this.mainWindow.webContents.send('timer-res', id, currentSeconds);
  }

  startListener() {
    ipcMain.handle(
      'timer-start',
      (__, id, currentSeconds, interval, direction) => {
        if (id == this.id) {
          this.currentSeconds = currentSeconds;
          this.interval = interval;
          this.direction = direction;
          this.start();
        }
      }
    );
    ipcMain.handle('timer-stop', (__, id) => {
      if (id == this.id) {
        clearTimeout(this.timeout);
      }
    });
    ipcMain.handle('timer-direction', (__, id, isDirectionDown) => {
      if (id == this.id) {
        this.directionIsDown = isDirectionDown;
      }
    });
    ipcMain.handle('timer-upAfterDown', (__, id, upAfterDown) => {
      if (id == this.id) {
        this.upAfterDown = upAfterDown;
      }
    });
  }
}
