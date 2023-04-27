const job = require('../../handlers/auth/handler')

module.exports = function (fastify, opts, next) {
    fastify.route({
        method: 'POST',
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
                200: {
                    type:       'object',
                    properties: {
                        message:    { type: 'string' },
                        statusCode: { type: 'integer' },
                    }
                },
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
            if (data.statusCode !== 200) {
                reply.status(400)
            }
            reply.send(data)
        }
    });
    next();
};

module.exports.autoPrefix = process.env.API + 'auth';