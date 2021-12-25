const { exec } = require("child_process");
const { app, BrowserWindow } = require('electron');

const createWindow = () => {
    const window = new BrowserWindow({
        width:80*8,
        height:1000,
        resizable: false
    });

    window.loadFile('./views/index.html');
    //window.webContents.openDevTools();
}

app.whenReady().then(() => {
    createWindow();
})

engine = exec('./engine/engine.out', (error, stdout, stderr) => {
    if(error) { throw error }
    console.log(stdout);
});