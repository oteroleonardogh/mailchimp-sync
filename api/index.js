const app = require('../app');

module.exports = async (req, res) => {
    await app.ready();
    app.server.emit('request', req, res);
};