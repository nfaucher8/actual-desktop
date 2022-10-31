module.exports = () => {
    const fs = require('fs');
    // Return project folder state to before build
    fs.unlinkSync('icon.png');
    fs.unlinkSync('actual-server/load-config.js');
    fs.renameSync('actual-server/_load-config.js', 'actual-server/load-config.js');
}