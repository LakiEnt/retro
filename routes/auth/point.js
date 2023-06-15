const job = require('../../handlers/auth/handler')

module.exports = function (fastify, opts, next) {
    fastify.route({
        method: 'POST',
        url:    '/login',
        schema: {
            body:     {
                type:       'object',
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
                    },
                },
            },
        },
        async handler(request, reply) {
            let data = await job.auth(request.body)

            if (data.statusCode !== 200) {
                reply.status(400)
            }

            reply.send(data);
        }
    });

    fastify.route({
        method: 'POST',
        url:    '/register',
        schema: {
            body: {
                type:       'object',
                properties: {
                  userNickName:        { type: 'string' },
                  userEmail:           { type: 'string' },
                  userPassword:        { type: 'string' },
                  userCountry:         { type: 'string' },
                },
                required: [ 'userNickName', 'userEmail', 'userPassword', 'userCountry' ],
            },
            response: {
                400: {
                    type:       'object',
                    properties: {
                        message:    { type: 'string' },
                        statusCode: { type: 'integer' },
                    },
                },
            },
        },
        async handler (request, reply) {
            let data = await job.register(request.body)

            if (data.statusCode !== 200) {
                reply.status(400)
            }

            reply.send(data);
        }
    });

    fastify.route({
        method: 'GET',
        url:    '/verify/:userId/:token',
        schema: {
            params: {
                type:       'object',
                properties: {
                    userId: { type: 'integer' },
                    token:  { type: 'string' },
                },
                required: [ 'userId', 'token' ],
            },
            response: {
                400: {
                    type:       'object',
                    properties: {
                        message:    { type: 'string' },
                        statusCode: { type: 'integer' },
                    },
                },
            },
        },
        async handler (request, reply) {
            let data = await job.verify(request.params)

            if (data.statusCode !== 200) {
                reply.status(400)
            }

            reply.send(data);
        }
    });

    next();
};

module.exports.autoPrefix = process.env.API + 'auth';