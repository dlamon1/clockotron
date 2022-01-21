import { ipcMain } from 'electron';

export class StoreListeners {
  setListener;
  getListener;
  store;

  constructor(store) {
    this.store = store;
  }

  mountListeners() {
    this.setListener = () => {
      ipcMain.handle('store-set', (__, key, value) => {
        this.store.set(key, value);
      });
    };
    this.getListener = () => {
      ipcMain.handle('store-get', (__, key) => {
        let value = this.store.set(key);
        return value;
      });
    };
    this.setListener();
    this.getListener();
  }

  removeListeners() {
    ipcMain.removeListener('store-set', this.setListener);
    ipcMain.removeListener('store-get', this.getListener);
  }
}
