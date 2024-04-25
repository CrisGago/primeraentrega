import mongoose from 'mongoose';
import mongoosePage from 'mongoose-paginate-v2';


const pageCollection = "page";

const mongoose = require('mongoose');

const pageSchema = new mongoose.Schema({
  name: String,
  category: String,
  availability: Boolean,
  price: Number
});

const page = mongoose.model('page', pageSchema);



const cartModel = mongoose.model(pageCollection, cartSchema);

export default pageModel;