const pino = require('pino');

const log = pino({
    // Custom timestamp format
    timestamp: () => `,"time":"${new Date().toISOString()}"`,
    formatters: {
        level(label, number) {
            return { level: label };
        }
    },
    // Custom serializers
    serializers: {
        // Override the default serializers to achieve the desired log format
        pid: () => {},        // Removing pid
        hostname: () => {}    // Removing hostname
    },

});

module.exports = log;
