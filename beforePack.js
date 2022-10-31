const { config } = require('process');

const main = () => {
    const fs = require('fs');
    // Copy the current icon from `@actual-app` to be used as the app icon
    fs.copyFileSync('node_modules/@actual-app/web/build/android-chrome-512x512.png', 'icon.png');
    // Rename `load-config.js` in `actual-server` so we can inject our custom config
    fs.renameSync('actual-server/load-config.js', 'actual-server/_load-config.js')
    // Copy `load-config.js` from `actual-desktop` into `actual-server`
    fs.copyFileSync('load-config.js', 'actual-server/load-config.js');
}

module.exports = main
if (typeof require !== 'undefined' && require.main === module) {
    main();
}