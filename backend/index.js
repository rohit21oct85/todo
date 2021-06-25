const dotenv = require('dotenv').config({path: './config.env'});
const express = require('express');
const cors = require("cors");
const session = require('express-session')
const Routes = require("./routes/index");
const errorHandler = require('./middleware/error')
const app = express();
app.use(cors())
app.use(express.json());

const PORT = process.env.PORT || 8080;

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
    next();
});

// express session 
app.use(session({
    secret: 'todo-secerate',
    resave: true,
    saveUninitialized: true
}));


app.get('/api/v1/test', (req, res) => {
    res.send(`Test  Api running on Dev Environment`);
})

app.use('/api/v1/auth', Routes.authRoute)
app.use('/api/v1/todo', Routes.todoRoute)

// Error Handler
app.use(errorHandler);
  
const server = app.listen(PORT, () => {
    console.log(`Server is Running on PORT ${PORT}`)
})

process.on('unhandledRejection', (err, Promise) => {
    console.log(`Logged Error ${err}`);
    server.close(process.exit(1));
})

