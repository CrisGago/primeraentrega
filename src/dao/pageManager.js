const express = require('express');
const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const Product = require('./models/pageModel.js');


const app = express();
app.use(express.json());

// Agregar el plugin de paginación a tu esquema de producto
const productSchema = new mongoose.Schema({
  name: String,
  category: String,
  availability: Boolean,
  price: Number
});
productSchema.plugin(mongoosePaginate);
const Product = mongoose.model('Product', productSchema);

// Ruta para obtener productos paginados
app.get('/products', async (req, res) => {
  const limit = parseInt(req.query.limit) || 10;
  const page = parseInt(req.query.page) || 1;
  const sort = req.query.sort === 'asc' ? 'asc' : req.query.sort === 'desc' ? 'desc' : null;
  const query = req.query.query || '';

  try {
    let filter = {};
    if (query) {
      filter = { $or: [{ category: query }, { availability: query }] };
    }

    const options = {
      page,
      limit,
      sort: sort ? { price: sort } : null,
      customLabels: {
        totalDocs: 'totalProducts',
        docs: 'products',
        totalPages: 'totalPages'
      },
      pagination: true,
      populate: ''
    };

    const result = await Product.paginate(filter, options);

    const payload = {
      ...result,
      prevLink: result.prevPage ? `/products?limit=${limit}&page=${result.prevPage}&sort=${sort}&query=${query}` : null,
      nextLink: result.nextPage ? `/products?limit=${limit}&page=${result.nextPage}&sort=${sort}&query=${query}` : null
    };

    res.json({ status: 'success', payload });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
});

const conexion = async() =>{
    try{
        await mongoose.connect("mongodb+srv://crisgh:eC0der2024@cluster0.x8bucze.mongodb.net/ecommerce?retryWrites=true&w=majority&appName=Cluster0");
        console.log("Conectando con la bbdd MongoAtlas");
    }catch (error){
        console.log("Fallo la conexión");
    }
}
conexion();