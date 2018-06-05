const Electron = require('electron');
const LibPath = require('path');
const LibCp = require('child_process');

// -*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-
// GLOBAL
// -*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-
let WIN_MAIN;
let DIADUST;

// -*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-
// FUNC
// -*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-
const createMainWin = function() {
  WIN_MAIN = new Electron.BrowserWindow({width: 800, height: 600});
  WIN_MAIN.loadFile(LibPath.join(__dirname, './index.html'));
  WIN_MAIN.webContents.on('will-navigate', (event) => {
    event.preventDefault(); // prevent global dragover & drop event
  });
  WIN_MAIN.on('closed', () => {
    WIN_MAIN = null;
  });
};

const startDiadustGolang = function(callback) {
  DIADUST = LibCp.execFile(LibPath.join(__dirname, '../golang/bin/diadust'), (err) => {
    if (err && err.signal !== 'SIGINT') {
      console.error(err);
      process.exit(1);
    }
  });
  DIADUST.stdout.on('data', (data) => {
    console.log(`diadust-go:out: ${data}`);
  });
  DIADUST.stderr.on('data', (data) => {
    console.log(`diadust-go:err: ${data}`);
  });
  DIADUST.on('close', (code) => {
    console.log(`diadust-go:exit: ${code}`);
  });
  callback();
};

const terminateDiadustGolang = function() {
  DIADUST.kill('SIGINT');
};

// -*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-
// LIFECYCLE
// -*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-
Electron.app.on('ready', () => {
  Electron.crashReporter.start({
    companyName: 'diadust',
    productName: 'diadust',
    submitURL: 'http://127.0.0.1',
    uploadToServer: false,
  });
  // startDiadustGolang(() => {
    createMainWin();
  // });
});

/**
 * app.quit()
 * Try to close all windows. The before-quit event will be emitted first. If all windows are successfully closed, the will-quit event will be emitted and by default the application will terminate.
 *
 * This method guarantees that all beforeunload and unload event handlers are correctly executed. It is possible that a window cancels the quitting by returning false in the beforeunload event handler.
 */
Electron.app.on('before-quit', () => {
  // terminateDiadustGolang();
});

Electron.app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    Electron.app.quit();
  }
});

Electron.app.on('activate', () => {
  if (WIN_MAIN === null) {
    createMainWin();
  }
});

// -*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-
// ERROR
// -*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-
process.on('uncaughtException', (error) => {
  console.error(`Process on uncaughtException error = ${error.stack}`);
});

process.on('unhandledRejection', (error) => {
  console.error(`Process on unhandledRejection error = ${error.stack}`);
});