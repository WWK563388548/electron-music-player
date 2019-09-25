const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const Store = require('electron-store');

const store = new Store();

store.set('unicorn', '🦄');
console.log(store.get('unicorn'));
//=> '🦄'

// Use dot-notation to access nested properties
store.set('foo.bar', true);
console.log(store.get('foo'));
//=> {bar: true}

store.delete('unicorn');
console.log(store.get('unicorn'));
//=> undefined

console.log(app.getPath('userData'));

// 封装BrowserWindow类
class AppWindow extends BrowserWindow{
    constructor(config, fileLocation){
        const basicConfig = {
            width: 800,
            height: 600,
            webPreferences: {
                nodeIntegration: true, // nodeIntegration设置为true代表可以使用nodejs的API
            }
        };
        const finalConfig = {...basicConfig, ...config};
        super(finalConfig);
        this.loadFile(fileLocation); // 导入html去显示ui``
        // 消除显示窗口时的视觉闪烁(显示未渲染画面)
        this.once('ready-to-show', () => {
            console.log("ready-to-show");
            this.show();
        });
    }
}

// 'ready'代表electron已经完成加载并准备好创建BrowserWindow时调用
// BrowserWindow只能在主进程中使用
// 创建窗口
app.on('ready', () => {
    const mainWindow = new AppWindow({}, './ui/index.html');
    // mainWindow.webContents.openDevTools(); //打开开发者工具
    ipcMain.on('openAddMusicWindow', () => {
        console.log("openAddMusicWindow");
        const addMusicsWindow = new AppWindow({
            width: 500,
            height: 400,
            parent: mainWindow,
        }, './ui/add.html');
    });
    ipcMain.on('openMusicFile', (event) => {
        console.log("openMusicFile");
        dialog.showOpenDialog(
            {
                properties: ['openFile', 'multiSelections'],
                filters: [
                    { name: 'music', extensions: ['mp3'] },
                ]
            }, 
            (files) => {
                console.log("files", files);
                if(files){
                    event.sender.send('selectedFiles', files);
                }
            }
        );
    });
  
});