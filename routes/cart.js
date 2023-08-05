var express = require('express');
const joiValidation = require('../middlewares/joiValidation');
const auth = require('../middlewares/auth');
const { } = require('../schemas');
var router = express.Router();
const Cartservice = require('../services/cart')

router.get('/id/:id', auth.ensureSignedIn, async function (req, res) {
  const { id } = req.params;
  const result = await Cartservice.findById(id);
  res.json(result);
})

router.post('/create', auth.ensureSignedIn, async (req, res, next) => {
  const { product, quantity, price, total  } = req.body;
  const result = await Cartservice.create({ product, quantity, price, total })
  res.json(result);
})

// all categories
router.get('/all', async (req, res) => {
  // to do
  const result = await Cartservice.findAll();
  res.json(result);
})
router.post('/update', auth.ensureSignedIn, async (req, res, next) => {
  // to do
  const {_id, product, quantity, price, total} = req.body;
  const result = await Cartservice.update( _id,{product, quantity, price, total} );
  res.json(result);
})

router.post('/delete', auth.ensureSignedIn, async (req, res, next) => {
  // to do
  const {_id} = req.body;
  const result = await Cartservice.remove({_id});
  res.json(result);
})

module.exports = router