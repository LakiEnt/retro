const env = require('dotenv').config()
const fastify = require('fastify')({
  logger: true
})

fastify.get('/', function (request, reply) {
  reply.send({ hello: 'world' })
})

fastify.listen({ port: process.env.H_PORT }, (err, address) => {
  if (err) throw err;
  fastify.log.info(`server listening on ${address}`);
})



