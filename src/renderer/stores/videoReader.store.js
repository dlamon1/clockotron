import { makeAutoObservable } from 'mobx';

export class VideoReader {
  constructor() {
    makeAutoObservable(this);
  }
}
