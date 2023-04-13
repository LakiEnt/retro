// CommonJs
/**
 * @type {import('fastify').FastifyInstance} Instance of Fastify
 */
const fastify = require('fastify')({
    logger: true
  })
  
  
  fastify.listen({ port: 3030 }, function (err, address) {
    if (err) {
      fastify.log.error(err)
      process.exit(1)
    }
    // Server is now listening on ${address}
  })
  