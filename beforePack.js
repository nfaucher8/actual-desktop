module.exports = () => {
    const fs = require('fs');
    fs.copyFileSync('node_modules/@actual-app/web/build/android-chrome-512x512.png', 'icon.png');
}