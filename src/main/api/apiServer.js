import express from 'express';

export function apiFunction(mainWindow, api) {
  // const api = express();

  api.listen(5491, () => {});

  api.get('/api', (req, res) => {
    res.send('api');
  });
  api.get('/start', (req, res) => {
    res.send('start');
    mainWindow.webContents.send('start');
  });
  api.get('/stop', (req, res) => {
    res.send('stop');
    mainWindow.webContents.send('stop');
  });
  api.get('/slower', (req, res) => {
    res.send('slower');
    mainWindow.webContents.send('slower');
  });
  api.get('/normal', (req, res) => {
    res.send('normal');
    mainWindow.webContents.send('normal');
  });
  api.get('/faster', (req, res) => {
    res.send('faster');
    mainWindow.webContents.send('faster');
  });
  api.get('/reset', (req, res) => {
    res.send('reset');
    mainWindow.webContents.send('reset');
  });

  //TextInputList.js
  //TextInputList.js
  //TextInputList.js

  api.get('/digit', (req, res) => {
    res.send(req.query.value);
    let test = req.query.value.split('');
    mainWindow.webContents.send(req.query.value);
  });
  api.get('/timeSpecific', (req, res) => {
    res.send(req.query.value);
    mainWindow.webContents.send('timeSpecific', req.query.value);
  });
  api.get('/clear', (req, res) => {
    res.send('clear');
    mainWindow.webContents.send('clear');
    console.log(req);
  });
  api.get('/postClock', (req, res) => {
    res.send('postClock');
    mainWindow.webContents.send('postClock');
  });

  // TimeDown.js
  // TimeDown.js
  // TimeDown.js
  api.get('/sDown', (req, res) => {
    res.send('sDown');
    mainWindow.webContents.send('sDown');
  });
  api.get('/mDown', (req, res) => {
    res.send('mDown');
    mainWindow.webContents.send('mDown');
  });
  api.get('/hDown', (req, res) => {
    res.send('hDown');
    mainWindow.webContents.send('hDown');
  });

  //TimeUp.js
  //TimeUp.js
  //TimeUp.js
  api.get('/sUp', (req, res) => {
    res.send('sUp');
    mainWindow.webContents.send('sUp');
  });
  api.get('/mUp', (req, res) => {
    res.send('mUp');
    mainWindow.webContents.send('mUp');
  });
  api.get('/hUp', (req, res) => {
    res.send('hUp');
    mainWindow.webContents.send('hUp');
  });
}
