const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const connection = require('./database');
const cookieParser = require('cookie-parser');

//Middleware:
app.use(morgan("common"));
app.use(helmet());
app.use(express.json());
app.use(cors());
app.use(cookieParser());

//Routers:
const userRotue = require('./routes/users');
const authorizationRoute = require('./routes/auth');
const postRoute = require('./routes/posts');

//API routes:
app.use('/api/users', userRotue);
app.use('/api/auth', authorizationRoute);
app.use('/api/posts', postRoute);


connection();
app.get('/', (req, res) => {
    res.send("Hello");
})
app.listen(process.env.PORT || 3000, () => {
    console.log('The server is running successfully!');
})