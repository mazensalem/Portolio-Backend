const express = require('express');
const mongoose = require('mongoose');

const router = express.Router();
const contactSchema = new mongoose.Schema({
    name: String,
    email: String,
    msg: String,
    Date: Date,
    Seen: Boolean
});
const contactModel = mongoose.model('contactus', contactSchema);

router.get('/', async (req, res)=>{
    try {
        const contacts = await contactModel.find();
        res.status(200).json(contacts);
    }catch (err){
        console.log(err);
        res.status(500).json({"error": "something went wrong"});
    }
});

router.get('/getUnseen', async (req, res)=>{
    try {
        const contacts = await contactModel.find({Seen: false});
        res.status(200).json(contacts);
    }catch (err){
        console.log(err);
        res.status(500).json({"error": "something went wrong"});
    }
});

router.get('/:id', async (req, res)=>{
    const id = req.params.id;
    try{
        const contact = await contactModel.findById(id);
        res.status(200).json(contact);
    }catch (err){
        console.log(err);
        res.status(500).json({"error": "something went wrong"});
    }
})

router.put('/see/:id', async (req, res)=>{
    const id = req.params.id;
    try {
        const contact = await contactModel.findByIdAndUpdate(id, {Seen: true}, {returnDocument: 'after'});
        res.status(200).json(contact);
    }catch (err){
        console.log(err);
        res.status(500).json({"error": "something went wrong"});
    }
});

router.delete('/delete/:id', async (req, res)=>{
    const id  = req.params.id;
    try {
        const contact = await contactModel.findByIdAndDelete(id);
        res.status(200).json(contact);
    }catch (err){
        console.log(err);
        res.status(500).json({"error": "something went wrong"});
    }
});


router.post('/add', async (req, res)=>{
    try {
        const contact = await contactModel.create({
            name: req.body.name,
            email: req.body.email,
            msg: req.body.msg,
            Date: req.body.Date,
            Seen: false
        });
        res.status(200).json(contact);
    }catch (err){
        console.log(err);
        res.status(500).json({"error": "something went wrong"});
    }
});

module.exports = router;
