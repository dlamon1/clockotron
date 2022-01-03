import React, { createContext } from 'react';
import { useLocalObservable } from 'mobx-react';
import { Timer } from './StoreClasses';

export const StoreProvider = ({ children }) => {
  const store = useLocalObservable(() => ({
    timers: [],
    addTimer(type) {
      let timer = new Timer(type);
      store.timers = [...store.timers, timer];
    },
    removeTimer(value) {
      // console.log(value);
    },

    ip: '',
    setIp(x) {
      store.ip = x;
    },

    xmlRaw: '',
    setXmlRaw(data) {
      store.xmlRaw = data;
    },

    isSocketConnected: false,
    setIsSocketConnected(boolean) {
      store.isSocketConnected = boolean;
    },

    toastOpen: false,
    setToastOpen(bool) {
      this.toastOpen = bool;
    },

    severity: 'success',
    setSeverity(string) {
      this.severity = string;
    },

    alert: '',
    setAlert(string) {
      this.alert = string;
    },

    toastLength: 1000,
    setToastLength(x) {
      this.toastLength = x;
    },
  }));

  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  );
};

const StoreContext = createContext();

export const useGlobalStore = () => React.useContext(StoreContext);
