
const Products = require("../models/products")
var mongoose = require('mongoose');

const findById = async (id) => {
  const products = await Products.aggregate([
    {
      "$match": {
        _id: mongoose.Types.ObjectId(id),
      }
    },
    {
      $lookup: {
        from: "prices",
        localField: "_id",
        foreignField: "product",
        as: "prices"
      }
    }
  ])

  if (!products?.length)
    return null

  return products[0]
}

const findAll = async (category = '', item = '') => {
  let matchCond = {};
  if(category) matchCond['category'] = mongoose.Types.ObjectId(category)
  // if(item) matchCond['item'] = mongoose.Types.ObjectId(item)

  const products = await Products.aggregate([
    {
      "$match": matchCond
    },
    {
      $lookup: {
        from: "prices",
        localField: "_id",
        foreignField: "product",
        as: "prices"
      },

    },
    {
      $lookup: {
        from: "categories",
        localField: "category",
        foreignField: "_id",
        as: "category"
      },
    },
    // {

    //   $lookup: {
    //     from: "items",
    //     localField: "item",
    //     foreignField: "_id",
    //     as: "item"
    //   }
    // },
    { "$unwind": "$category" },
    // { "$unwind": "$item" },
  ])

  if (!products?.length)
    return []

  return products
}

const create = async (newProduct) => {
  try {
    const createproduct = await Products.create(newProduct);
    return {
            success: true,
            msg: "Create successfully",
            data: createproduct
    }
}
catch (err) {
    console.log(err);
    return {
            success: false,
            error: JSON.stringify(err) || 'error'
    }
}
}

const update = async (id, { title, category, item, user, imgeUrl,desc }) => {
  // to do
  try {
    const update = await Products.findByIdAndUpdate(id, { title, category, item, user, imgeUrl, desc })
     return {
             success:true,
             data: update,
             msg: "Update successfully!"
     }
}
catch(err){
     return{
             success: false,
             error: err.message
     }
}
}

const remove = async () => {
  // to doF
  try{
    await Products.findByIdAndDelete(id)
    return{
            success: true,
            data: "Product delete successfully"
    }
}
catch(err){
    return{
            success: false,
            err: err.message
    }
}
}

module.exports = {
  findById,
  update,
  remove,
  findAll,
  create
}