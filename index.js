const express = require('express');
const path = require('path');
const port = 8000;


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

app.get('/', (req,res)=>{
    // res.send('Hey am I visible'); 

    

    // Render the "profile.ejs" view with the provided data
    res.render('home', {
        title: "Contact List",
        contact_list:  contactList
    });
});

app.get('/practice', (req,res) =>{
    res.render('practice');
})
app.post('/create-contact', (req,res) =>{
    // return res.redirect('/practice');
    console.log(req.body);
    contactList.push({
       name: req.body.name,
       phone: req.body.phone
    });
    return res.redirect('/');
});

app.get('/delete-contact', (req,res) =>{
    // let phone ='req.params.phone';
    let phone = req.query.phone;
    let contactIndex = contactList.findIndex(contact => contact.phone == phone);
    if(contactIndex != -1){
        contactList.splice(contactIndex, 1);
    }

    return res.redirect('back');
});


app.listen(port, (err)=>{
    if(err){
        console.log("err",err);
        
    }
    console.log(" hureyyy! server is running fine");
});