import { app, Notification, dialog } from 'electron';
import { autoUpdater } from 'electron-updater';

export function updater(isDev, mainWindow) {
  if (!isDev) {
    autoUpdater.checkForUpdates();

    setInterval(() => {
      autoUpdater.checkForUpdates();
    }, 300000);

    autoUpdater.on('error', (message) => {
      console.error('There was a problem updating the application');
      console.error(message);
    });

    const restart = () => {
      if (process.platform === 'darwin') {
        setImmediate(() => {
          app.removeAllListeners('window-all-closed');
          if (mainWindow != null) {
            mainWindow.close();
          }
          autoUpdater.quitAndInstall(false);
        });
      } else {
        setImmediate(() => {
          autoUpdater.quitAndInstall();
        });
      }
    };

    autoUpdater.on('update-downloaded', (event, releaseNotes, releaseName) => {
      const dialogOpts = {
        type: 'info',
        buttons: ['Restart', 'Later'],
        title: 'Application Update',
        message: process.platform === 'win32' ? releaseNotes : releaseName,
        detail:
          'A new version has been downloaded. Restart the application to apply the updates.',
      };

      dialog.showMessageBox(dialogOpts).then((returnValue) => {
        if (returnValue.response === 0) {
          restart();
        }
      });
    });
  }
}
