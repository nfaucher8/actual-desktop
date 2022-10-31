const {app: electronApp} = require('electron');
let { join } = require('path');

let config = {
  mode: 'development',
  port: 5006,
  hostname: '127.0.0.1',
  serverFiles: join(electronApp.getPath('userData'),  "server-files"),
  userFiles: join(electronApp.getPath('userData'), "user-files")
};

// The env variable always takes precedence
config.userFiles = process.env.ACTUAL_USER_FILES || config.userFiles;

module.exports = config;