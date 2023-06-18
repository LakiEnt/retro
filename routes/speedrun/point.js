const job = require('../../handlers/speedrun/handler')

module.exports = function (fastify, opts, next) {
  fastify.route({
    method: 'POST',
    url: '/show',
    schema: {
      body: {
        type: 'object',
        properties: {
          page:   { type: 'integer' },
          gameId: { type: 'integer' }
        },
        required: [ 'page', 'gameId' ]
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
      let data = await job.showSpeedruns(request.body)
      if (data.statusCode !== 200) {
        reply.status(400)
      }

      reply.send(data)
    }
  })

  next();
}

module.exports.autoPrefix = process.env.API + 'speedrun';
