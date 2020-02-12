const express = require('express');

const postsRouter = require('./posts/posts-router.js');

const server = express();

server.use(express.json());

server.use('/api/posts', postsRouter);

server.get('/', (req, res) => {
  res.send(`<h1>Hello World!</h1>`);
});

const port = 5000;
server.listen(port, () => {
  console.log(`Server Running on https://localhost:${port}`);
});
