const {app, BrowserWindow} = require('electron');
const path = require('path');
const url = require('url');
let win;

function createWindow () {
  // ブラウザウィンドウを作成します。
  win = new BrowserWindow({width: 800, height: 600});

  //アプリケーションのindex.htmlをロードします。
  win.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }));

    // Open the DevTools.
    win.webContents.openDevTools()

  //ウィンドウが閉じられると発生します。
  win.on('closed', () => {
    win = null
  });

}
//このメソッドは、Electronが初期化を終了し、ブラウザウィンドウを作成する準備ができたときに呼び出されます。
app.on('ready', createWindow);

//すべてのウィンドウが閉じられると終了します。
app.on('window-all-closed', () => {
  // MacOSでは、ユーザーがCmd + Qで明示的に終了するまでプロセスは生き続ける
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // MacOSでは、ウィンドウを全て閉じても、プロセスは生き続け、
  // ドックアイコンをクリックすると、再表示される。
  if (win === null) {
    createWindow();
  }
});
