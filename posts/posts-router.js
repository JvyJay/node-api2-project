const express = require('express');

const Posts = require('../data/db.js');

const router = express.Router();

// POST
router.post('/', (req, res) => {
  const { title, contents } = req.body;

  Posts.insert({ title, contents })
    .then(user => {
      res.status(201).json(user);
    })
    .catch(err => {
      if (!title || !contents) {
        console.log(err);
        res.status(400).json({
          errorMessage: 'Please provide title and contents for the post.'
        });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        errorMessage: 'There was an error while saving the post to the database'
      });
    });
});

// POST COMMENT
router.post('/:id/comments', (req, res) => {
  const id = req.params.id;
  const { text } = req.body;

  Posts.insert({ text })
    .then(comment => {
      res.status(201).json(comment);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        errorMessage:
          'There was an error while saving the comment to the database'
      });
    });
  if (!text) {
    console.log(err);
    res
      .status(400)
      .json({ errorMessage: 'Please provide text for the comment.' });
  }
  if (!id) {
    console.log(err);
    res.status(404).json({
      errorMessage: 'The post with the specified ID does not exist.'
    });
  }
});

// GET POST
router.get('/', (req, res) => {
  Posts.find()
    .then(post => {
      res.status(200).json(post);
    })
    .catch(err => {
      res.status(500).json({
        errorMessage: 'The posts information could not be retrieved.'
      });
    });
});

// GET SPECIFIC POST
router.get('/:id', (req, res) => {
  const { id } = req.params;

  Posts.findById(id)
    .then(post => {
      res.status(201).json(post);
    })
    .catch(err => {
      console.log(err);
      res
        .status(500)
        .json({ errorMessage: 'The post information could not be retrieved.' });
    });
  if (!id) {
    res.status(404).json({
      errorMessage: 'The post with the specified ID does not exist.'
    });
  }
});

// GET SPECIFIC COMMENT
router.get('/:id/comments', (req, res) => {
  const { id } = req.params;

  Posts.findById(id)
    .then(post => {
      res.status(200).json(post);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        errorMessage: 'The comments information could not be retrieved.'
      });
    });

  if (!id) {
    res
      .status(404)
      .json({ errorMessage: 'The post with the specified ID does not exist.' });
  }
});

// DELETE POST
router.delete('/:id', (req, res) => {
  const { id } = req.params;

  Posts.remove(id)
    .then(del => {
      if (del) {
        res.status(200).json(del);
      } else {
        res.status(404).json({
          errorMessage: 'The post with the specified ID does not exist.'
        });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ errorMessage: 'The post could not be removed' });
    });
});

// PUT/UPDATE POST
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { title, contents } = req.body;

  if (!title || !contents) {
    res
      .status(400)
      .json({
        errorMessage: 'Please provide title and contents for the post.'
      });
  }

  if (!id) {
    res
      .status(404)
      .json({ errorMessage: 'The post with the specified ID does not exist.' });
  }

  Posts.update(id, { title, contents }).then(post => {
    if (post) {
      res.status(200).json({ successfulMsg: 'Post did update', post });
    } else {
      res
        .status(500)
        .json({ errorMessage: 'The post information could not be modified.' });
    }
  });
});

module.exports = router;
