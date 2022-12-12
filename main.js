const { app, BrowserWindow, ipcMain } = require('electron');

app.on('ready', () => {
    let mainWindow = new BrowserWindow({
        width: 600,
        height: 350,
        darkTheme: true,
        resizable: false,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        }
    });

    mainWindow.loadURL(`file://${__dirname}/app/index.html`);
});

app.on('window-all-closed', () => {
    app.quit();
});

let janelaSobre = null;
ipcMain.on('abrir-janela-sobre', () => {

    if (janelaSobre == null) {
        janelaSobre = new BrowserWindow({
            width: 400,
            height: 200,
            alwaysOnTop: true,
            frame: false,
            webPreferences: {
                nodeIntegration: true,
                contextIsolation: false
            }
        });
        janelaSobre.on('closed', () => {
            janelaSobre = null;
        });

    }


    janelaSobre.loadURL(`file://${__dirname}/app/sobre.html`);


});

ipcMain.on('fechar-janela-sobre', () => { 
        janelaSobre.close();
 });

 ipcMain.on('curso-parado', (event, curso, tempo)=>{
    
 });