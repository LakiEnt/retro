const job = require('../../handlers/landing/handler')

module.exports = function (fastify, opts, next) {
  fastify.route({
    method: 'GET',
    url: '/show',
    schema: {
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
      let data = await job.showMain()
      if (data.statusCode !== 200) {
        reply.status(400)
      }

      reply.send(data)
    }
  })

  next();
}

module.exports.autoPrefix = process.env.API + 'landing';
