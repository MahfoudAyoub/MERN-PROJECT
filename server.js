const express = require('express');
const userRoutes = require('./routes/user.routes');
const bodyParser = require('body-parser');
require('dotenv').config({path: './config/.env'});
require('./config/db')
const app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//ROUTES
app.use('/api/user', userRoutes);


//SERVER
app.listen(process.env.PORT, () => {
    console.log(`Listning on port ${process.env.PORT}`);
})