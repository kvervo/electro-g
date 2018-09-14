const electron = require('electron');
const { app, BrowserWindow, Menu, shell } = electron;
const { template } = require('./menuTemplate');
// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) { // eslint-disable-line global-require
  app.quit();
}

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

const menu = Menu.buildFromTemplate(template);
// const mainUrl = `https://calendar.google.com/calendar`;
const loadUrl = `https://meet.google.com`;
const loadOptions = {
  // userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/66.0.3359.181 Safari/537.36',
};

const createWindow = () => {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 960,
    titleBarStyle: 'customButtonsOnHover',
    webPreferences: {
      nodeIntegration: false,
    }
  });

  // and load the index.html of the app.
  mainWindow.loadURL(loadUrl, loadOptions);

  // Open the DevTools.
  // mainWindow.webContents.openDevTools();

  // Emitted when the window is closed.
  mainWindow.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });

  mainWindow.webContents.on('new-window', (event, url, frameName, disposition, options, additionalFeatures) => {
    // Links in event description will throw two events:
    //    (1) First event will open a new-windows with about:blank url
    //    (2) Second event will open a new-windows with correct link url
    // Hence, we hide first blank window
    // Check for about:blank is important since there are _blank links we want to open in the app, like hangouts
    if (frameName === '_blank' && url === "about:blank") {
      options.show = false;
    }
    // Upon second event we find all hidden blank windows and destroy them
    // only then open the url in external browser
    if (frameName !== '_blank') {
      const blankWindows = BrowserWindow.getAllWindows().filter(window => { return window.frameName === "_blank"});
      blankWindows.forEach(window => {
        window.destroy();
      });
      event.preventDefault();
      shell.openExternal(url);
  }});

  // Add Menu Items
  Menu.setApplicationMenu(menu);
  console.log(process.versions.electron);
  console.log(process.versions.chrome);
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.