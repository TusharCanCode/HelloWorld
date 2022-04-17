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
app.use(cors({ credentials: true, origin: true }));
app.use(cookieParser());

//Routers:
const userRotue = require('./routes/users');
const authorizationRoute = require('./routes/auth');
const postRoute = require('./routes/posts');
const conversationRoute = require('./routes/conversation');
const messageRoute = require('./routes/message');

//API routes:
app.use('/api/users', userRotue);
app.use('/api/auth', authorizationRoute);
app.use('/api/posts', postRoute);
app.use('/api/conversations', conversationRoute);
app.use('/api/message', messageRoute);

connection();
app.listen(process.env.PORT || 5000, () => {
    console.log('The server is running successfully!');
})