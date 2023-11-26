const { ipcRenderer } = require('electron');

const button = document.getElementById('button');
const text = document.getElementById('text');

button.addEventListener('click', async () => {
    text.textContent = await ipcRenderer.invoke('open-dialog');
});

function openInputWindow() {
    ipcRenderer.send('button-clicked');
}
