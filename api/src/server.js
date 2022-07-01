const express = require('express');
const cors = require('cors');

const routes = require('./routes');
const config = require('./config/config.json')[process.env.NODE_ENV];
const initDatabase = requirer('./config/database');
const { auth } = require('./middlewares/authMiddleware');
const { initializeData } = require('./initialize');

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(auth);

// app.use(express.static(path.resolve(__dirname, './public')))
app.use(routes);

initDatabase(config.DB_CONNECTION_STRING)
    .then(() => {
        app.listen(config.PORT, () => console.log(`App is running on http://localhost:${config.PORT}`));
    })
    .catch(err => {
        console.log('Application init failed: ', err)
    })

initializeData(); 