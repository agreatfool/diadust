const Electron = require('electron');
const LibPath = require('path');
const LibCp = require('child_process');

let main;
const createMainWin = function() {
  main = new Electron.BrowserWindow({width: 800, height: 600});
  main.loadFile(LibPath.join(__dirname, './index.html'));
  main.on('closed', () => {
    main = null;
  });
};

Electron.app.on('ready', () => {
  startDiadustGolang(() => {
    createMainWin();
  });
});

Electron.app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    Electron.app.quit();
  }
});

Electron.app.on('activate', () => {
  if (main === null) {
    createMainWin();
  }
});

const startDiadustGolang = function(callback) {
  const diadust = LibCp.spawn(LibPath.join(__dirname, '../golang/bin/diadust'));
  diadust.stdout.on('data', (data) => {
    if (data.indexOf('http server Running on') !== -1) {
      callback();
    }
    console.log(`diadust-go:out: ${data}`);
  });
  diadust.stderr.on('data', (data) => {
    console.log(`diadust-go:err: ${data}`);
  });
  diadust.on('close', (code) => {
    console.log(`diadust-go:exit: ${code}`);
  });
};