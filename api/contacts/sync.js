// api/contacts/sync.js
const fastify = require('../../app'); // Adjust the path to where your Fastify app is initialized

module.exports = async (req, res) => {
    await fastify.ready();
    fastify.server.emit('request', req, res);
};
