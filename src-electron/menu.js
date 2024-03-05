import {
    Menu,
    BrowserWindow,
    shell,
    app
} from 'electron'

const isMac = process.platform === 'darwin'

let template = [
    ...(isMac ? [{
        label: app.name,
        submenu: [{
            label: 'about',
            role: 'about'
        }, {
            label: 'focusedWindow',
            accelerator: 'CmdOrCtrl+R',
            click: function(item, focusedWindow) {
                if (focusedWindow) {
                    // on reload, start fresh and close any old
                    // open secondary windows
                    if (focusedWindow.id === 1) {
                        BrowserWindow.getAllWindows().forEach(function(win) {
                            if (win.id > 1) {
                                win.close()
                            }
                        })
                    }
                    focusedWindow.reload()
                }
            }
        }, {
            label: 'quit',
            role: 'quit'
        }]
    }] : []), {
        label: 'submenu',
        submenu: [{
            label: 'copy',
            accelerator: 'CmdOrCtrl+C',
            role: 'copy'
        }, {
            label: 'paste',
            accelerator: 'CmdOrCtrl+V',
            role: 'paste'
        }]
    }, {
        label: 'window',
        role: 'window',
        submenu: [{
            label: 'minimize',
            accelerator: 'CmdOrCtrl+M',
            role: 'minimize'
        }, {
            label: 'close',
            accelerator: 'CmdOrCtrl+W',
            role: 'close'
        }]
    }, {
        label: 'help',
        role: 'help',
        submenu: [{
            label: 'shell openExternal',
            click: function() {
                shell.openExternal('https://support.qq.com/products/111465')
            }
        }, {
            label: 'shell openExternal',
            click: function() {
                shell.openExternal('https://wahao.github.io/Bark-MP-helper/#/zh-cn/')
            }
        }, {
            type: 'separator'
        }]
    }
]

// 右键菜单
const contextMenuTemplate = [
{
    label: 'copy',
    role: 'copy'
}, {
    label: 'paste',
    role: 'paste'
}]

const initMenu = () => {
    try {
        const menu = Menu.buildFromTemplate(template)
        Menu.setApplicationMenu(menu) // 设置菜单部分
    } catch (err) {
        console.error(err)
    }
}

const initContextMenu = () => {
    try {
        const contextMenu = Menu.buildFromTemplate(contextMenuTemplate)
        contextMenu.popup(BrowserWindow.getFocusedWindow())
    } catch (err) {
        console.error(err)
    }
}

export const menu = {
    initMenu,
    initContextMenu
}
