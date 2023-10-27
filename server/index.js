const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');


const app = express();
app.use(cors())
app.use(bodyParser.json());
const PORT = process.env.PORT || 3000;

mongoose.connect('mongodb://localhost:27017/beautyParlourDB', {useNewUrlParser: true,useUnifiedTopology: true})
  .then(() => console.log('Database connected successfully'))
  .catch(e => console.error('Database connection error:', e));

app.use('/customer', require('./Routes/Customers'));

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
