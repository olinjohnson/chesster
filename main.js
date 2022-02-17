const { app, BrowserWindow, ipcMain } = require("electron");
const { exec } = require("child_process");

//Initialize app, draw window
const createWindow = () => {
  const window = new BrowserWindow({
    width: 80 * 8 + 200,
    height: 1000,
    resizable: false,
    fullscreenable: false,
    webPreferences: {
      preload: `${__dirname}/preload.js`,
    },
  });

  window.loadFile("./views/index.html");
};

app.whenReady().then(() => {
  createWindow();
});

ipcMain.on("styleEdit", (event, data) => {
  //data should be hex1, hex2, -mt (optional)
  cols = data.split(" ");
  if (cols[0] == "#000000") {
    cols[0] = "#494949";
  }
  if (cols[1] == "#000000") {
    cols[1] = "#494949";
  }
  exec(
    `python3 pieceEditor.py "${cols[0]}" "${cols[1]}" -mt`,
    (error, stdout, stderr) => {
      if (error) {
        throw error;
      }
      console.log(stdout);
    }
  );
});

ipcMain.on("move", (event, data) => {
  console.log(data);
});

//A bit of code to call the engine.c file
/*engine = exec("./engine/engine.out", (error, stdout, stderr) => {
  if (error) {
    throw error;
  }
  console.log(stdout);
});*/
