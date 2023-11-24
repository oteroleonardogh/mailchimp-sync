const log = require('./logger');
const fastify = require('fastify')({ logger: log });
const { sync } = require('./service');
const config = require('./config');

// Define the /contacts/sync route
fastify.get('/contacts/sync', async (request, reply) => {
    try {
        const syncResult = await sync();
        reply.send(syncResult);
    } catch (error) {
        request.log.error(error);
        reply.status(500).send({ error: 'Internal Server Error' });
    }
});

// Run the server
const start = async () => {
    try {
        await fastify.listen({ port: config.PORT, host: config.HOST });
    } catch (err) {
        log.error(err);
        process.exit(1);
    }
};

start();

module.exports = fastify;