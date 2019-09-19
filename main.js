const { app, BrowserWindow, ipcMain } = require('electron');

// 'ready'代表electron已经完成加载并准备好创建BrowserWindow时调用
// BrowserWindow只能在主进程中使用
// 创建窗口
app.on('ready', () => {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true, // nodeIntegration设置为true代表可以使用nodejs的API
    }
  });
  mainWindow.loadFile('./ui/index.html'); // 导入html去显示ui
  mainWindow.webContents.openDevTools(); //打开开发者工具
  // 使用ipcMain接收从渲染进程发送过来的数据
  ipcMain.on('message', (event, arg) => {
    console.log('received message from renderer process: ', arg);
    // 从主进程作出回复
    // 也可以使用mainWindow来代替event.sender
    event.sender.send('reply', 'hello from main');
  });
});