const express = require('express');

const Users = require('./data/db.js');

const server = express();

server.use(express.json());

//POST
server.post('/api/users', (req, res) => {
  const userData = req.body;
});

const port = 8000;
server.listen(port, () => console.log(`\n ** api on port: ${port} ** \n`));
