const {app, BrowserWindow} = require('electron')
const path = require('path')
const url = require('url')
let win;

function createWindow () {
    // Create the browser window.
    win = new BrowserWindow({width: 800, height: 600, autoHideMenuBar:true,fullscreen: true});
    // and load the index.html of the app.
    win.loadURL(url.format({
        pathname: path.join(__dirname,"html", 'index.html'),
        protocol: 'file:',
        slashes: true
    }));
    win.on("closed",()=>win = null);
}

app.on("window-all-closed",app.quit);

app.on('ready', createWindow);