const userController = require("../controllers/user.controller");
const { protect } = require("../middleware/protect");

async function routes(fastify, options) {

  fastify.post("/register", { preHandler: protect }, userController.registerUser);
  fastify.post("/login", { preHandler: protect }, userController.loginUser);


}

module.exports = routes;