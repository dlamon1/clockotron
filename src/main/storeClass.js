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
        console.log(key, this.store.get(key));
      });
    };
    this.setListener();
  }

  removeListeners() {
    ipcMain.removeListener('store-set', this.setListener);
  }
}
