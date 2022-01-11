import React, { createContext } from 'react';

import { VideoReader } from './videoReader.store';

const videoReader = new VideoReader();

export const StoreContext = createContext({
  videoReader,
});
