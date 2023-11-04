const express = require('express');
const path = require('path');
const port = 8000;

const db = require('./config/mongoose'); //import config of db
const Contact = require('./models/contact'); // requiring the model of contact from models


const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded());
app.use(express.static('assets'));

var contactList = [
        {
            name: "Dhruva",
            phone: "1234567890"
        },
        {
            name:"Dhruva1",
            phone:"0987654321"
        },
        {
            name:"Rahul",
            phone:"1234509876"
        }
    ]
// this is no longer accepts callback instead we are using the promises 
// app.get('/', (req,res)=>{
//     // res.send('Hey am I visible'); 

    

//     // Render the "profile.ejs" view with the provided data
//     // res.render('home', {
//     //     title: "Contact List",
//     //     contact_list:  contactList
//     // });

//     Contact.find({} , (err, contacts) =>{
//         if(err){
//             console.log('error in fatching contacts from db');
//             return;
//         }
//         return res.render('home', {
//         title: "Contact List",
//         contact_list:  contacts
//     });

//     });
// });


app.get('/', (req, res) => {
    // Use promises to fetch contacts from the database
    Contact.find({})
      .then((contacts) => {
        res.render('home', {
          title: 'Contact List',
          contact_list: contacts,
        });
      })
      .catch((error) => {
        console.error('Error fetching contacts:', error);
        return res.status(500).send('Error fetching contacts from the database');
      });
  });
  

app.get('/practice', (req,res) =>{
    res.render('practice');
})
app.post('/create-contact', (req,res) =>{
    // return res.redirect('/practice');
    // console.log(req.body);
    // contactList.push({
    //    name: req.body.name,
    //    phone: req.body.phone
    // });
    // Contact.create({
    //     name:req.body.name,
    //     phone:req.body.phone
    // }, function(err,newConact){
    //     if(err){
    //         console.log('error in creating contact');
    //         return;
    //     }
    //     console.log('new contact is created******', newConact);
    //     res.redirect('back');
    // });

    Contact.create({
        name: req.body.name,
        phone: req.body.phone
    })
    .then((newContact) => {
        console.log('New contact is created:', newContact);
        res.redirect('back');
    })
    .catch((err) => {
        console.log('Error in creating contact:', err);
    });
    
    // return res.redirect('/');
});

app.get('/delete-contact', (req,res) =>{
    // let phone ='req.params.phone';
    // let phone = req.query.phone;
   // Get the id from the query in the URL
// Get the id from the query in the URL
let id = req.query.id;
id = id.trim();

// Find the contact in the database using the id and delete it
Contact.findByIdAndDelete(id)
  .then(() => {
    // Contact successfully deleted
    return res.redirect('back');
  })
  .catch((err) => {
    console.log('Error in deleting from the database:', err);
    return res.status(500).send('Error deleting the contact');
  });


    // let contactIndex = contactList.findIndex(contact => contact.phone == phone);
    // if(contactIndex != -1){
    //     contactList.splice(contactIndex, 1);
    // }

    // return res.redirect('back');
});


app.listen(port, (err)=>{
    if(err){
        console.log("err",err);
        
    }
    console.log(" hureyyy! server is running fine");
});