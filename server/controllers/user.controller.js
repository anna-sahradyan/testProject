const User = require("../models/User");
const jwt = require("jsonwebtoken");
const secret = process.env.APIKEY;
const bcrypt = require("bcryptjs");

async function generateToken(user) {
  return jwt.sign({ email: user.email, id: user._id }, secret, { expiresIn: "30d" });
}

async function registerUser(req, reply) {
  const { email, password, firstName, lastName } = req.body;

  try {
    const oldUser = await User.findOne({ email });

    if (oldUser) {
      reply.code(400).send({ message: "User already exists" });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const result = await User.create({ email, password: hashedPassword, name: `${firstName} ${lastName}` });

    const token = await generateToken(result);
    reply.code(201).send({ result, token });
  } catch (error) {
    reply.code(500).send({ message: "Something went wrong" });
    console.error(error);
  }
}

async function loginUser(req, reply) {
  const { email, password } = req.body;
  try {
    const oldUser = await User.findOne({ email });
    if (!oldUser) return reply.code(404).json({ message: "User  doesn't exist " });
    const isPasswordCorrect = await bcrypt.compare(password, oldUser.password);
    if (!isPasswordCorrect) return reply.code(400).json({ message: "Invalid credentials" });
    const token = await generateToken(oldUser);
    reply.code(200).send({ result: oldUser, token });

  } catch (err) {
    reply.code(500).send({ message: "Something went wrong" });
  }
}


module.exports = {
  registerUser,
  loginUser,
};
