const express = require('express');
const about = require('./about');
const services = require('./services');
const experience = require('./experience');
const skills = require('./skills');
const education = require('./education');
const projects = require('./projects');
const contact = require('./contact');
const mongoose = require('mongoose');
const app = express();
const port = 3000;

mongoose.connect('mongodb://localhost:27017/Portfolio').then((data)=>console.log('DataBase Connection'));


app.use(express.json());

// TODO: Add Images
// TODO: Make the text a markdown formate
app.use('/about', about);
app.use('/services', services);
app.use('/skills', skills);
app.use('/education', education);
app.use('/projects', projects);
app.use('/contact',  contact);
app.use('/experience', experience);


app.use('/', (req, res)=>{
    res.status(404).json({error: "This page doesn't exist"});
});

app.listen(port, _=>{
    console.log('Server Started');
});

