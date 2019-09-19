const { app, BrowserWindow } = require('electron');

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

  // 创建第二个窗口
  /* const secondWindow = new BrowserWindow({
      width: 200,
      height: 100,
      webPreferences: {
        nodeIntegration: true, // nodeIntegration设置为true代表可以使用nodejs的API
      },
      parent: mainWindow, // 定义第二个窗口的父窗口, 当父窗口关闭子窗口也会随之关闭
    });
    mainWindow.loadFile('index.html'); // 导入html去显示ui
  */
});