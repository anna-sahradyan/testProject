const User = require("../models/User");
const jwt = require("jsonwebtoken");

const protect = async (fastify, opts, next) => {
  fastify.register(require("fastify-cookie"));

  fastify.addHook("preHandler", async (request, reply) => {
    try {
      const token = request.cookies.token;
      if (!token) {
        reply.code(401).send(new Error("Not authorized, please login"));
        return;
      }
      const verified = jwt.verify(token, process.env.APIKEY);

      const user = await User.findById(verified.id).select("_password");
      if (!user) {
        reply.code(401).send(new Error("User not found"));
        return;
      }
      request.user = user;
    } catch (err) {
      reply.status(401).send(new Error("Not authorized, please login"));

    }
  });

  next();
};

module.exports = protect;