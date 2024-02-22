const { ipcRenderer } = require('electron');

const button = document.getElementById('button');
const text = document.getElementById('text');

const fs = require('fs'); 

getMemoData()

button.addEventListener('click', async () => {
    const filePath = await ipcRenderer.invoke('open-dialog');
    ipcRenderer.send('send-path-to-parent', filePath);
    getMemoData()
});

function getMemoData() {
    ipcRenderer.send('request-memo-file-path');
    ipcRenderer.on('memo-file-path-from-parent-to-mainWindow', (event, path) => {
        if (path) {
            const json = fs.readFileSync(path)
            const data = JSON.parse(json)
            console.log(data)
        }
        else {
            return
        }
    });
}

function openInputWindow() {
    ipcRenderer.send('button-clicked');
}
