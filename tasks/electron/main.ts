import { app, BrowserWindow } from 'electron';
import installExtension, {REACT_DEVELOPER_TOOLS, REDUX_DEVTOOLS, REACT_PERF } from 'electron-devtools-installer';
import * as path from 'path';

const dir = path.join(__dirname, '..', '..');

let mainWindow;
let config = {
  devtron: false,
  url: `file://${dir}/index.html`,
  port: 8081
};

if (process.env.NODE_ENV === 'development') {
  config.url = `http://localhost:${config.port}`;
}

function createWindow() {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    height: 1440,
    width: 800,
    frame: false
  })

  mainWindow.loadURL(config.url)

  if (process.env.NODE_ENV === 'development') {

    BrowserWindow.addDevToolsExtension(path.join(dir, 'node_modules', 'devtron'));

    installExtension(REACT_DEVELOPER_TOOLS)
      .then((name) => mainWindow.webContents.openDevTools())
      .catch((err) => console.log('An error occurred: ', err));

    installExtension(REDUX_DEVTOOLS)
      .catch((err) => console.log('An error occurred: ', err));

  }

  mainWindow.on('closed', () => {
    mainWindow = null
  })

  console.log('mainWindow opened')
}

// CSS Grids
app.commandLine.appendSwitch('js-flags', 'enable-experimental-web-platform-features');

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})