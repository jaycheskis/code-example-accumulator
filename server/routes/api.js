const express = require('express');

const methodController = require('../controllers/methodController.js');

const router = express.Router();

router.get('/',
  methodController.getMethod,
  (req, res) => res.status(200).json(res.locals.method)
);

router.post('/',
  methodController.createMethod,
  (req, res) => res.status(200).send(res.locals.createdMethod)
);

router.delete('/',
  methodController.deleteMethod,
  (req, res) => res.status(200).send(res.locals.deleteResult)
);


module.exports = router;