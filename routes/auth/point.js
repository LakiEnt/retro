const job = require('../../handlers/auth/handler')

module.exports = function (fastify, opts, next) {
    fastify.route({
        method: 'GET',
        url: '/',
        schema: {
            body: {
                type: 'object',
                properties: {
                    nickName: { type: 'string' },
                    password: { type: 'string' },
                }
            },
            response: {
                400: {
                    type:       'object',
                    properties: {
                        message:    { type: 'string' },
                        statusCode: { type: 'integer' },
                    }
                }
            }
        },
        async handler(request, reply) {
            let data = await job.auth(request.body)
        }
    });
    next();
};

module.exports.autoPrefix = process.env.API + 'auth';