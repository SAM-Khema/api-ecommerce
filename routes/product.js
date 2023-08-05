var express = require('express');
const joiValidation = require('../middlewares/joiValidation');
const auth = require('../middlewares/auth');
const { } = require('../schemas');
var router = express.Router();

const productService = require('../services/product');

router.get('/id/:id', auth.ensureSignedIn, async function (req, res, next) {
  const { id } = req.params;
  const result = await productService.findById(id);
  res.json(result);
})

// all
router.get('/all/:category?', async (req, res) => {
  const { category } = req.params;
  const result = await productService.findAll(category);
  res.json(result);
})

router.post('/create', auth.ensureSignedIn, async (req, res,) => {
  const { title, category,  user, imageUrl, desc, price} = req.body;

  const result = await productService.create({
    title,
    category,
    user,
    imageUrl,
    desc,
    price,
  })
  res.json(result);
})

router.post('/update', auth.ensureSignedIn, async (req, res, next) => {
  // to do
  const {_id, name, category, item, user, imageUrl, desc, price} = req.body;
  const result = await productService.update( _id,{name, category, item, user, imageUrl, desc, price} );
  res.json(result);
})

router.post('/delete', auth.ensureSignedIn, async (req, res, next) => {
  // to do
  const {_id} = req.body;
  const result = await productService.remove({_id});
  res.json(result);
})

module.exports = router