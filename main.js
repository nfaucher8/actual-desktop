// Modules to control application life and create native browser window
const {app, BrowserWindow} = require('electron');
const Config = require('electron-store');
const config = new Config();
const fs = require('fs');


const createWindow = () => {
  const opts = {
    autoHideMenuBar: true,
    height: 600, 
    icon: __dirname + '/node_modules/@actual-app/web/build/favicon-32x32.png',
    show: false, 
    width: 800, 
    ...config.get('winBounds')
  }
  const mainWindow = new BrowserWindow(opts)
  
  // TODO: The port should be based off the config
  mainWindow.loadURL('http://127.0.0.1:5006')

  mainWindow.once('ready-to-show', mainWindow.show);

  // On close save the position and size of the window to electron-store
  mainWindow.on('close', () => {
    config.set('winBounds', mainWindow.getBounds())
  })
}
// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(async () => {
  // Get the previous window bounds from the electron-store
  // If config is null it won't overwrite `width` and `height` and instead the defined keys will be used

  // This will require actual-server's app.js which will start the server
  let actualServer = require('./actual');
  await actualServer();

  createWindow();

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })

  app.on("close", function() {
    // When the window is closed save its last size
    var data = mainWindow.getBounds();
    fs.writeFileSync(initPath, JSON.stringify(data));
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
