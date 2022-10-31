module.exports = async () => {
  const fs = require('fs');
  const express = require('express');
  const actuator = require('express-actuator');
  const bodyParser = require('body-parser');
  const cors = require('cors');

  // ***** Extra imports for custom electron config *****
  const {app: electronApp} = require('electron');
  let { join } = require('path');
  

  // ***** Custom "load-config" *****
  let config = {
    mode: 'development',
    port: 5006,
    hostname: '127.0.0.1',
    serverFiles: join(electronApp.getPath('userData'),  "server-files"),
    userFiles: join(electronApp.getPath('userData'), "user-files")
  };
  
  // The env variable always takes precedence
  config.userFiles = process.env.ACTUAL_USER_FILES || config.userFiles;

  const accountApp = require('./actual-server/app-account');
  const syncApp = require('./actual-server/app-sync');

  const app = express();

  process.on('unhandledRejection', (reason) => {
    console.log('Rejection:', reason);
  });

  app.use(cors());
  app.use(bodyParser.json({ limit: '20mb' }));
  app.use(bodyParser.raw({ type: 'application/actual-sync', limit: '20mb' }));
  app.use(bodyParser.raw({ type: 'application/encrypted-file', limit: '50mb' }));

  app.use('/sync', syncApp.handlers);
  app.use('/account', accountApp.handlers);

  app.get('/mode', (req, res) => {
      res.send(config.mode);
  });

  app.use(actuator()); // Provides /health, /metrics, /info

  // The web frontend
  app.use((req, res, next) => {
    res.set('Cross-Origin-Opener-Policy', 'same-origin');
    res.set('Cross-Origin-Embedder-Policy', 'require-corp');
    next();
  });
  app.use(
  express.static(__dirname + '/node_modules/@actual-app/web/build', {
    index: false
  })
  );
  app.get('/*', (req, res) => {
  res.sendFile(__dirname + '/node_modules/@actual-app/web/build/index.html');
  });

  async function run() {
  console.log(config.serverFiles);
  console.log(config.userFiles);
  if (!fs.existsSync(config.serverFiles)) {
    fs.mkdirSync(config.serverFiles);
  }

  if (!fs.existsSync(config.userFiles)) {
    fs.mkdirSync(config.userFiles);
  }

  await accountApp.init();
  await syncApp.init();

  console.log('Listening on ' + config.hostname + ':' + config.port + '...');
    app.listen(config.port, config.hostname);
  }

  run().catch((err) => {
    console.log('Error starting app:', err);
    process.exit(1);
  });
}