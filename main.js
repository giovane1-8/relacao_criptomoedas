const { NONAME } = require('dns')
const { app, BrowserWindow } = require('electron')


const path = require('path')
var createWindow = (configs) => {

  var win = new BrowserWindow(configs)
  win.webContents.openDevTools()

  win.loadFile('src/pags/index.html')
}
app.whenReady().then(() => {
  
  
  createWindow({
    height: 720,
    width: 1200,
    webPreferences:{
      preload: path.join(__dirname,"src/js/preload/index.js")
    }
  })


  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})