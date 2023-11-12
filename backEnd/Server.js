const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const app = express();

dotenv.config();

const port = 3001;
const host = 'localhost';

app.use(cors());
app.use(express.json());

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Conexión exitosa a MongoDB Atlas');
    return true; // Devolvemos "true" para indicar éxito
    }
    catch (error) {
      console.error('Error al conectar a MongoDB Atlas:', error);
    throw error; // Lanzar un error para que se capture en el archivo serverAtlas.js
    };
};
(async () => {
  try {
    await connectDB();
  } catch (error) {
    console.error('Error starting the server:', error);
  }
})();


const ItemSchema = new mongoose.Schema({
  nombre: String,
  correo: String,
  contrasena: String,
  confirmacion: String,
});

const Item = mongoose.model('Item', ItemSchema);

// Crear 
app.post('/items', async (req, res) => {
  const { query, language } = req.body;
  const newItem = new Item({ name: query, description: language });

  try {
    await newItem.save();
    res.status(201).json(newItem);
  } catch (error) {
    res.status(500).json({ error: 'Error creating item' });
  }
});

// Retrieve all items (Read operation)
app.get('/items', async (req, res) => {
  try {
    const items = await Item.find();
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching items' });
  }
});

// Update an item (Update operation)
app.put('/items/:id', async (req, res) => {
  const itemId = req.params.id;
  const { name, description } = req.body;

  try {
    const updatedItem = await Item.findByIdAndUpdate(itemId, { name, description });
    res.status(200).json(updatedItem);
  } catch (error) {
    res.status(500).json({ error: 'Error updating item' });
  }
});

// Delete an item (Delete operation)
app.delete('/items/:id', async (req, res) => {
  const itemId = req.params.id;

  try {
    await Item.findByIdAndRemove(itemId);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Error deleting item' });
  }
});


app.listen(port, host, () => {
  console.log(`Servidor iniciado en el puerto ${port}`);
  
});

module.exports = { connectDB };

