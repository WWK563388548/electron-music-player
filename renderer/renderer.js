const { ipcRenderer }  = require('electron');

// DOM Api
window.addEventListener('DOMContentLoaded', () => {
    console.log("DOMContentLoaded");
    // 从渲染进程向主进程发送数据
    ipcRenderer.send('message', 'Hello from renderer process');
    ipcRenderer.on('reply', (event, arg) => {
        document.getElementById('message').innerHTML = arg;
    });
});
