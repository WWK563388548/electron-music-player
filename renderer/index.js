const { ipcRenderer }  = require('electron');

document.getElementById('add-musics-button').addEventListener('click', () => {
    // alert("Add musics button was clicked");
    ipcRenderer.send("openAddMusicWindow");
});
