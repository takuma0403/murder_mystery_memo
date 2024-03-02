const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const path = require('path');
const url = require('url');

function createMainWindow () {
  let mainWindow = new BrowserWindow({
    width: 1000,
    height: 800,
    webPreferences: {
      defaultEncoding: 'UTF-8',
      nodeIntegration: true,
      contextIsolation: false,
    }
  });

  mainWindow.webContents.openDevTools() // デベロッパーツール

  //アプリケーションのindex.htmlをロードします。
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, '/mianWindow.html'),
    protocol: 'file:',
    slashes: true
  }));

  ipcMain.handle('open-dialog', async (_e, _arg) => {
    return dialog
      // ファイル選択ダイアログを表示する
      .showOpenDialog(mainWindow, {
        properties: ['openFile'],
      })
      .then((result) => {
        // キャンセルボタンが押されたとき
        if (result.canceled) return '';

        // 選択されたファイルの絶対パスを返す
        return result.filePaths[0];
      })
      .catch((err) => console.error(err));
  });

  //ウィンドウが閉じられると発生します。
  mainWindow.on('closed', () => {
    win = null
  });

  mainWindow.webContents.on('did-finish-load', () => {
    mainWindow.webContents.send('button-clicked');
  });

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createMainWindow();
    }
  });

  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });

  ipcMain.on('text-entered', (event, text) => {
    console.log('Text entered:', text);
  });

  ipcMain.on('send-path-to-parent', (event, path) => {
    memoFilePath = path;
  });
  
  ipcMain.on('request-memo-file-path', () => {
    // 子ウィンドウにファイルパスのデータを送信
    mainWindow.webContents.send('memo-file-path-from-parent-to-mainWindow', memoFilePath);
  });
}

let memoFilePath = ""

app.whenReady().then(createMainWindow);

// 新しいウィンドウを開く処理
ipcMain.on('button-clicked', () => {
  const inputWindow = new BrowserWindow({
    width: 400,
    height: 600,
    modal: true,
    show: false
  });

  inputWindow.loadFile(path.join(__dirname, '/inputWindow.html'));

  inputWindow.once('ready-to-show', () => {
    inputWindow.show();
  });

  // インプットウィンドウが閉じられたときの処理
  inputWindow.on('closed', () => {
    inputWindow.destroy();
  });
});