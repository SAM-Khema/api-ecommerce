
const Categories = require("../models/categories")

const findById = async (id) => {
  return await Categories.findById(id);
}

const findAll = async () => {
  return await Categories.find();
}

const findCategorizedItems = async () => {
  return await Categories.aggregate([
    {
      $lookup: {
        from: "items",
        localField: "_id",
        foreignField: "category",
        as: "items"
      }
    },
    {
      $project: {
        _id: 1,
        name: 1,
        desc: 1,
        imageUrl: 1,
        items: {
          _id: 1,
          name: 1,
          category: 1,
          desc: 1,
        }
      }
    }
  ])
}

const create = async (newCategory) => {
  // to do
  const createdCate = await Categories.create(newCategory);
  return createdCate;
}

const update = async () => {
  // to do
}

const remove = async () => {
  // to do
}

module.exports = {
  findById,
  update,
  remove,
  findAll,
  create,
  findCategorizedItems
}