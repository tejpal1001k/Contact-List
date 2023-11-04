//require the library
const mongoose = require('mongoose');

//connect to db
mongoose.connect('mongodb://127.0.0.1:27017/contact_list_db');

//aquire the connection(to check if it is successfull)
const db = mongoose.connection;
//checking the error
db.on('error', console.error.bind(console, 'error to connecting db'));

//if up and running then print the msg
db.once('open', function(){
    console.log('successfuly connected');
});