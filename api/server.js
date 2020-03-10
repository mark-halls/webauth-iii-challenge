const express = require(`express`);
const helmet = require(`helmet`);
const cors = require(`cors`);
const morgan = require(`morgan`);

const authRouter = require(`./routers/auth/auth-router`);
const userRouter = require(`./routers/users/users-router`);

const server = express();

server.use(helmet());
server.use(express.json());
server.use(morgan(`dev`));
server.use(express.json());
server.use(cors());

server.use(`/api/auth`, authRouter);
server.use(`/api/users`, userRouter);

const start = port => {
  server.listen(port, console.log(`\n**Server listening on port ${port}**\n`));
};

module.exports = start;
