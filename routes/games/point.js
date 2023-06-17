const job = require('../../handlers/games/handler')

module.exports = function (fastify, opts, next) {
    fastify.route({
        method: 'POST',
        url: '/show',
        schema: {
            body: {
                type: 'object',
                properties: {
                    page: { type: 'integer' }
                }
            },
            response: {
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

  fastify.route({
    method: 'POST',
    url: '/addGame',
    schema: {
      body: {
        type: 'object',
        properties: {
            name:        { type: 'string' },
            date:        { type: 'string' },
            description: { type: 'string' },
            imageURL:    { type: 'string' },
        },
      },
      response: {
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
      let data = await job.addGame(request.body)
      if (data.statusCode !== 200) {
        reply.status(400)
      }

      reply.send(data)
    }
  })

    next();
};

module.exports.autoPrefix = process.env.API + 'games';
