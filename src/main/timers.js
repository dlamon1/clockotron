import { ipcMain } from 'electron';

export class Timer {
  id;
  interval;
  startSeconds;
  timeout;
  expected;
  mainWindow;
  currentSeconds;
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
    if (this.currentSeconds == 0 && this.directionIsDown && this.upAfterDown) {
      this.directionIsDown = false;
      this.sendTimerDirectionChange();
    }

    let drift = Date.now() - this.expected;
    if (drift > this.interval) {
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

    if (this.currentSeconds == 0 && !this.upAfterDown) {
      clearTimeout(this.timeout);
      this.sendTimerStopped();
      return;
    }

    console.log(this.currentSeconds);

    this.expected += this.interval;

    this.timeout = setTimeout(this.session.bind(this), this.interval - drift);
  }

  sendTimerDirectionChange() {
    this.mainWindow.webContents.send(
      'timer-directionChange',
      this.id,
      this.directionIsDown
    );
  }

  sendTimerData(id, currentSeconds) {
    this.mainWindow.webContents.send('timer-res', id, currentSeconds);
  }

  sendTimerStopped() {
    this.mainWindow.webContents.send('timer-stopped', this.id);
  }

  startListener() {
    ipcMain.handle(
      'timer-start',
      (__, id, currentSeconds, interval, isCountingDown) => {
        if (id == this.id) {
          this.currentSeconds = currentSeconds;
          this.interval = interval;
          this.direction = isCountingDown;
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
    ipcMain.handle('timer-interval', (__, id, interval) => {
      if (id == this.id) {
        this.interval = interval;
      }
    });
    ipcMain.handle('timer-UpdateCurrentSeconds', (__, id, currentSeconds) => {
      if (id == this.id) {
        this.currentSeconds = currentSeconds;
      }
    });
  }
}
