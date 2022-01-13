import React, { createContext } from 'react';

import { Timer } from './timer.store';
import { Vmix } from './vmix.store';
import { AlertStore } from './alert.store';
import { VideoReader } from './videoReader.store';
import { ClockotronState } from './clockotron.store';

const alertStore = new AlertStore();
const timer = new Timer(alertStore);
const vmix = new Vmix(alertStore);
const videoReader = new VideoReader();
const clockotron = new ClockotronState();

export const StoreContext = createContext({
  timer,
  vmix,
  alertStore,
  videoReader,
  clockotron,
});
