const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const routes = require('./routes');
const config = require('./config/config.json')[process.env.NODE_ENV];
// const initDatabase = requirer('./config/database'); -> да преместя логиката за базата тук
const { auth } = require('./middlewares/authMiddleware');
// const { initializeData } = require('./initialize');

const app = express();
mongoose.connect('mongodb://localhost:27017/superheroes')
    .then(() => {
        console.log('DB Connected');
    });
mongoose.connection.on('error', (error) => {
    console.log('DB Error:', error);
})
app.use(express.urlencoded({ extended: true }));
// app.use(express.static(path.resolce(__dirname, './public')))
app.use(express.json());
app.use(cors());
app.use(auth);

app.get('/', (req, res) => {
    res.json({ text: 'It\'s working!' });
});

app.use(routes);

// initDatabase(config.DB_CONNECTION_STRING)
//     .then(() => {
//         app.listen(5000, () => console.log(`App is running on http://localhost:${config.PORT}`));
//     })
//     .catch(err => {
//         console.log('Application init failed: ', err)
//     })

app.listen(5000, () => console.log('App is running on port 5000'));

// initializeData(); 