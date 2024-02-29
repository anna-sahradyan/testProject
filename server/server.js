const fastify = require('fastify')({ logger: true });
const fastifyCors = require('@fastify/cors');
const configurationDatabase = require('./config/databaseDB');
const mongoose = require('mongoose');
require('dotenv').config();

const databaseConfig = {
  uri: process.env.MONGODB_URI,
  option: {},
};
fastify.register(fastifyCors, {
  origin: ['*'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
});
const startServer = async () => {
  try {

    await fastify.listen(
     process.env.PORT || 5000,
      '0.0.0.0');
    fastify.log.info(`Server is running on port ${fastify.server.address().port}`);
  } catch (err) {
    console.log(err);
  }
};
const configuresRoutes = () => {
  const userRoutes = require('./routes/user.router');
  fastify.register(userRoutes, { prefix: '/api/v1/users' });
};
const start = async () => {
  try {
    await configurationDatabase(databaseConfig);
    configuresRoutes();
    await startServer();
  } catch (err) {
    console.log(err);
  }
  process.on('SIGINT', async () => {
    try {
      await mongoose.connection.close();
      process.exit(0);
    } catch (err) {
      console.error('Error closing Mongoose connection', err);
      process.exit(1);
    }
  });
};

start();