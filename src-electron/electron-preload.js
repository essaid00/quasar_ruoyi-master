const { contextBridge,ipcMain,BrowserWindow } = require('electron')
const { ipcRenderer } = require('electron');
contextBridge.exposeInMainWorld('myAPI', {
  doAThing: () => {  
      console.log("closed")
      ipcRenderer.invoke('window-close');
    }
})

contextBridge.exposeInMainWorld('myAPI3', {

     subscribe: () => {  
      console.log("subscribe")
      ipcRenderer.invoke('subscribe');
    }
})