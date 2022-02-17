let { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("api", { ipcRenderer });
