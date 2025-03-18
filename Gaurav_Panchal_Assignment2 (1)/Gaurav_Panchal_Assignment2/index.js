//Packages
const express = require('express')
const path = require('path')
const ejs = require('ejs')
const mongoose = require('mongoose')
const DriveCenter = require('./models/DriveCenter')


//Initializing Express Appx
const app = new express()

//View Templating engine
app.set('view engine', 'ejs')

//Setting folder for Static files
app.use(express.static('public'))

//Middlewares
app.use(express.json())
app.use(express.urlencoded())

//Connection string to connect with MongoDB Atlas
mongoose.connect('mongodb+srv://admin:admin@cluster0.esd06.mongodb.net/DriveCenter_DB?retryWrites=true&w=majority&appName=Cluster0')

//Request Handlers (get,post,put)
app.get('/', (req,res)=>{
    res.render('index') //index.ejs
})

app.get('/g2test', (req,res)=>{
    res.render('g2Test') //about.ejs
})

app.get('/gtest', (req, res) => {
    res.render('gTest', { userFound: null, user: null });
});


app.get('/login', (req,res)=>{
    res.render('login') //post.ejs
})

app.post('/users/fetch', async (req, res) => {
    try {
        const { licenceNumber } = req.body;

        const user = await DriveCenter.findOne({ licenceNumber });

        if (user) {
            res.render('gTest', {
                userFound: true,
                user: user,
            });
        } else {
            res.render('gTest', {
                userFound: false,
            });
        }
    } catch (error) {
        res.status(500).send("An error occurred while fetching the user.");
    }
});


app.post('/users/update', async (req, res) => {
    try {
        const { licenceNumber, make, model, year, plateNumber } = req.body;

        const updatedUser = await DriveCenter.findOneAndUpdate(
            { licenceNumber },
            {
                $set: {
                    'carDetails.make': make,
                    'carDetails.model': model,
                    'carDetails.year': year,
                    'carDetails.plateNumber': plateNumber,
                },
            },
            { new: true }
        );

        if (updatedUser) {
            res.render('gTest', {
                userFound: false,
                user: updatedUser,
            });
        } 
    } catch (error) {
        res.status(500).send("An error occurred while updating the user.");
    }
});


app.post("/users/store", async (req, res) => {
    try {
        const { firstName, lastName, licenceNumber, age, make, model, year, plateNumber } = req.body;
        await DriveCenter.create({
            firstName,
            lastName,
            licenceNumber,
            age,
            carDetails: {
                make,
                model,
                year,
                plateNumber,
            },
        });
        res.redirect("/");
    } catch (error) {
        res.status(500).send("An error occurred.");
    }
});

//Port number
app.listen(4000, ()=>{
    console.log('App is running at 4000 port')
})