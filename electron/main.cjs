// Desktop shell: serves the built Angular app from a private app:// origin so the
// router sees normal paths and plans saved in localStorage persist between launches.
const { app, BrowserWindow, net, protocol, shell } = require('electron');
const path = require('node:path');
const { pathToFileURL } = require('node:url');

const ROOT = path.join(__dirname, '..', 'dist', 'fortunes-weave-planner', 'browser');

protocol.registerSchemesAsPrivileged([
  { scheme: 'app', privileges: { standard: true, secure: true, supportFetchAPI: true } },
]);

function createWindow() {
  const win = new BrowserWindow({
    width: 1400,
    height: 900,
    title: "Fortune's Weave Planner",
    autoHideMenuBar: true,
  });
  // Links (sources in the footer) open in the user's browser, not inside the app.
  win.webContents.setWindowOpenHandler(({ url }) => {
    shell.openExternal(url);
    return { action: 'deny' };
  });
  win.loadURL('app://planner/');
}

app.whenReady().then(() => {
  protocol.handle('app', (request) => {
    const { pathname } = new URL(request.url);
    const file = path.normalize(path.join(ROOT, decodeURIComponent(pathname)));
    // Anything outside the build folder, or with no file extension, gets the app itself.
    const inside = file.startsWith(ROOT + path.sep);
    const target = inside && path.extname(file) ? file : path.join(ROOT, 'index.html');
    return net.fetch(pathToFileURL(target).toString());
  });
  createWindow();
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
