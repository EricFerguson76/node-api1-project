const express = require('express');

const Users = require('./data/db.js');

const server = express();

server.use(express.json());

//GET
server.get('/api/users', (req, res) => {
  Users.find()
    .then(user => {
      res.status(200).json(user);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        errorMessage: 'The users information could not be retrieved.'
      });
    });
});

//GET USER BY ID
server.get('/api/users/:id', (req, res) => {
  const { id } = req.params;

  Users.findById(id)
    .then(found => {
      if (found) {
        res.status(200).json(found);
      } else {
        res
          .status(400)
          .json({ message: 'The user with the specified ID does not exist' });
      }
    })
    .catch(() => {
      res
        .status(500)
        .json({ errorMessage: 'The user infomation could not be retrieved' });
    });
});

//POST
server.post('/api/users', (req, res) => {
  const userData = req.body;

  Users.insert(userData)
    .then(user => {
      res.status(201).json(user);
    })
    .catch(() => {
      if (userData !== 'name' && 'bio') {
        res
          .status(400)
          .json({ errorMessage: 'Please provide name and bio for the user' });
      } else {
        res.status(500).json({
          errorMessage:
            'There was an error while saving the user to the database'
        });
      }
    });
});

const port = 8000;
server.listen(port, () => console.log(`\n ** api on port: ${port} ** \n`));
