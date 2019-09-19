const { ipcRenderer }  = require('electron');
const path = require('path');

document.getElementById('select-musics').addEventListener('click', () => {
    ipcRenderer.send("openMusicFile");
});

const renderListHTML = (pathes) => {
    const musicList = document.getElementById('musics-list');
    const musicItemsHTML = pathes.reduce((html, music) => {
        // 使用nodejs中的path API去获取路径中的名字
        html = html + `<li class="collection-item">${path.basename(music)}</li>`;
        return html;
    }, '');
    musicList.innerHTML = `<ul class="collection">${musicItemsHTML}</ul>`;
};

// 接收从主线程传回的数据
ipcRenderer.on('selectedFiles', (event, path) => {
    if(Array.isArray(path)){
        renderListHTML(path);
    }
});