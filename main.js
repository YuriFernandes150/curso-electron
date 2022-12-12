const { app, BrowserWindow, ipcMain, Tray, Menu, globalShortcut } = require('electron');
const data = require('./data');
const templates = require('./templates');


let tray = null;
let mainWindow = null;
app.on('ready', () => {
    mainWindow = new BrowserWindow({
        width: 600,
        height: 400,
        darkTheme: true,
        resizable: false,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        }
    });

    tray = new Tray(__dirname + '/app/img/icon.png');
    tray.setContextMenu(Menu.buildFromTemplate(templates.gerarMenuTemplate(mainWindow)))

    Menu.setApplicationMenu(Menu.buildFromTemplate(templates.geraMenuPrincipalTemplate()));

    globalShortcut.register('CmdOrCtrl+Shift+S', () => {
        mainWindow.send('atalho-iniciar-parar');
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
        data.salvaDados(curso, tempo)
        console.log(`O curso ${curso} foi estudado por ${tempo}`);
 });

 ipcMain.on('curso-adicionado', (event, novoCurso) => {
    let novoTemplate = templates.adicionaCursoNoTray(novoCurso, mainWindow);
    let novoTrayMenu = Menu.buildFromTemplate(novoTemplate);
    tray.setContextMenu(novoTrayMenu);
});