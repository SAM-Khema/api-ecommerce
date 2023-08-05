const mongoose = require('mongoose');

module.exports = async () => {
  try {
    await mongoose.connect('mongodb+srv://khema:khema123@khema.1awb3op.mongodb.net/ecommerce?retryWrites=true&w=majority', {
      // mongodb://127.0.0.1:27017/ecommerce
      autoIndex: true,
      serverSelectionTimeoutMS: 30000 // default 30 seconds
    });
    console.log("MongoDB connected~");
  } catch (err) {
    console.log("Mongoose: ",err);
  }
}

