const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const routes = require('./routes');
const { auth } = require('./middlewares/authMiddleware');

const app = express();
mongoose.connect('mongodb://localhost:27017/superheroes')
    .then(() => {
        console.log('DB Connected');
    });
mongoose.connection.on('error', (error) => {
    console.log('DB Error:', error);
})
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.json({ text: 'It\'s working!' });
});

app.use(auth);
app.use(routes);
app.listen(5000, () => console.log('App is running on port 5000'))