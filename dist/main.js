"use strict";
exports.__esModule = true;
var electron = require("electron");
var translations = require('./translations');
// find default language
var defaultLanguage = translations.defaultLanguage;
// browser-window creates a native window
var app = electron.app;
var browserWindow = electron.BrowserWindow;
var mainWindow;
app.on('window-all-closed', function () {
    if (process.platform != 'darwin') {
        app.quit();
    }
});
app.on('ready', function () {
    // Initialize the window to our specified dimensions
    mainWindow = new browserWindow({ width: 1200, height: 900 });
    var indexPath;
    if (translations.languages.length > 0) {
        indexPath = "file://" + __dirname + "/" + defaultLanguage + "/index.html";
    }
    else {
        indexPath = "file://" + __dirname + "/index.html";
    }
    // Tell Electron where to load the entry point from
    mainWindow.loadURL(indexPath);
    // Clear out the main window when the app is closed
    mainWindow.on('closed', function () {
        mainWindow = null;
    });
});
