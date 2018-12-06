//handle setupevents as quickly as possible
const setupEvents = require('./installers/setupEvents')
if (setupEvents.handleSquirrelEvent()) {
   // squirrel event handled and app will exit in 1000ms, so don't do anything else
   return;
}



const electron = require('electron')
// Module to control application life.
const app = electron.app
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow
const ipc = require('electron').ipcMain
const path = require('path')
const url = require('url')
require('events').EventEmitter.prototype._maxListeners = 100;

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

var newgithubwin;
var newwechatwin;
var newweibowin;
var newyoutubewin;
var hasgithubwin = false;
var haswechatwin = false;
var hasweibowin = false;
var hasyoutubewin = false;
ipc.on('youtube',()=>
{
  if(!hasyoutubewin) {
    hasyoutubewin = true
    newyoutubewin = new BrowserWindow({
      width: 600, 
      height: 400,
      frame:true
    })
    newyoutubewin.setMenu(null)
    newyoutubewin.loadURL(path.join('file:',__dirname,'/page/youtube.html'))
    newyoutubewin.on('closed',()=>{newyoutubewin = null;hasyoutubewin = false})
  } else {
    newyoutubewin.restore()
    newyoutubewin.focus();
  }
})
ipc.on('github',()=>
{
  if(!hasgithubwin) {
    hasgithubwin = true
    newgithubwin = new BrowserWindow({
      width: 600, 
      height: 400,
      frame:true
    })
    newgithubwin.setMenu(null)
    newgithubwin.loadURL(path.join('file:',__dirname,'/page/github.html'))
    newgithubwin.on('closed',()=>{newgithubwin = null;hasgithubwin = false})
  } else {
    newgithubwin.restore()
    newgithubwin.focus();
  }
})
ipc.on('wechat',()=>
{
  if(!haswechatwin) {
    haswechatwin = true
    newwechatwin = new BrowserWindow({
      width: 600, 
      height: 400,
      frame:true
    })
    newwechatwin.setMenu(null)
    newwechatwin.loadURL(path.join('file:',__dirname,'/page/wechat.html'))
    newwechatwin.on('closed',()=>{newwechatwin = null;haswechatwin = false})
  } else {
    newwechatwin.restore()
    newwechatwin.focus();
  }
})
ipc.on('weibo',()=>
{
  if(!hasweibowin) {
    hasweibowin = true
    newweibowin = new BrowserWindow({
      width: 600, 
      height: 400,
      frame:true
    })
    newweibowin.setMenu(null)
    newweibowin.loadURL(path.join('file:',__dirname,'/page/weibo.html'))
    newweibowin.on('closed',()=>{newweibowin = null;hasweibowin = false})
  } else {
    newweibowin.restore()
    newweibowin.focus();
  }
})
function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({width:800, height: 600, frame:true})
  mainWindow.setMenu(null)

  // and load the index.html of the app.
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }))


  // Open the DevTools.
  // mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.

    app.quit()
  })





}


// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
})

