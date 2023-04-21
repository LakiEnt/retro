const job = require('../../handlers/games/handler')

module.exports = function (fastify, opts, next) {
    fastify.route({
        method: 'POST',
        url: '/',
        schema: {
            body: {
                type: 'object',
                properties: {
                    page: { type: 'integer' }
                }
            },
            response: {
                200: {
                    type: 'object',
                    properties: {
                        message: {
                            type: 'object',
                            properties: {
                                data: {
                                    type: 'array',
                                    items: {
                                        type: 'object',
                                        properties: {
                                            gameId:             { type: 'integer' },
                                            gameName:           { type: 'string' },
                                            gameDate:           { type: 'string' },
                                            gameDescription:    { type: 'string' },
                                        }
                                    }
                                }
                            }
                        },
                        statusCode: { type: 'integer' }
                    }
                },
                400: {
                    type:       'object',
                    properties: {
                        message:    { type: 'string' },
                        statusCode: { type: 'integer' },
                    },
                },
            }
        },
        async handler(request, reply) {
            let data = await job.showGames(request.body)
            if (data.statusCode !== 200) {
                reply.status(400)
            }

            reply.send(data)
        }
    })
    next();
};

module.exports.autoPrefix = process.env.API + 'games';