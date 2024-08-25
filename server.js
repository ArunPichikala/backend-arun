const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const model= require('./model')
const app = express();
const PORT = 200;

app.use(cors()); 
app.use(express.json()); 

const mongoURI = 'mongodb://0.0.0.0/mydata'; 
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => console.error('MongoDB connection error:', err));

  app.post('/post', async (req, res) => {
    const { alphabets, numbers, smallestLowercase } = req.body;
  
    if (!Array.isArray(alphabets) || !Array.isArray(numbers) || !Array.isArray(smallestLowercase)) {
      return res.status(400).send('Invalid data format');
    }
  
    try {
      
      const newData = new DataModel({
        is_success: true,
        numbers,
        alphabets,
        highest_lowercase_alphabet: smallestLowercase 
      });
  
      await newData.save();
  
      res.status(201).send('Document created successfully');
    } catch (error) {
      console.error('Error creating document:', error);
      res.status(500).send('Error creating document');
    }
  });
  app.get('/get-data', async (req, res) => {
    try {
      const documents = await DataModel.find({}, 'alphabets numbers highest_lowercase_alphabet');
  
      const result = documents.map(doc => ({
        alphabets: doc.alphabets,
        numbers: doc.numbers,
        smallestLowercase: doc.highest_lowercase_alphabet
      }));
  
      res.status(200).json(result);
    } catch (error) {
      console.error('Error fetching documents:', error);
      res.status(500).send('Error fetching documents');
    }
  });
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
