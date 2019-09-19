const { ipcRenderer }  = require('electron');

document.getElementById('select-musics').addEventListener('click', () => {
    ipcRenderer.send("openMusicFile");
});