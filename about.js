const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const aboutSchema = new mongoose.Schema(
    {
        title: {type: String},
        email: {type: String, required: true},
        address: {type: String, required: true},
        phone: {type: String, required: true},
        text: {type: String, required: true}, 
        active: Boolean, 
        isDeleted: Boolean,
        socials: {type: [{name: String, link: String}], _id:false} 
    });
const aboutModel = mongoose.model('About', aboutSchema);


router.get('/', async (req, res)=>{
    try{
        const allabouts = await aboutModel.find({isDeleted: false});
        res.status(200).json(allabouts);
    }catch(err){
        console.log(err);
        res.status(500).json({"error": "somethig went wrong"});
    }
});

router.get('/active', async (req, res)=>{
    try {
        const about = await aboutModel.findOne({active: true, isDeleted: false});
        res.status(200).json(about);
    }catch (err){
        console.log(err);
        res.status(500).json({"error": "something went wrong"});
    }
});


router.get('/:id', async (req, res)=>{
    const id = req.params.id;
    try{
        const about = await aboutModel.findById(id);
        res.status(200).json(about);
    }catch(err){
        console.log(err);
        res.status(500).json({"error": "something went wrong"});
    }
});


router.put('/edit/:id', async (req, res) => {
    try{
        const about = await aboutModel.findByIdAndUpdate(req.params.id, 
            {
                text: req.body.text, 
                title: req.body.title, 
                email: req.body.email, 
                address: req.body.address, 
                phone: req.body.phone,
                socials: req.body.socials
            },
            {returnDocument: 'after'});
        res.status(200).json(about);
    }catch (err){
        console.log(err);
        res.status(500).json({"error": "something went wrong"});
    }
});

router.put('/makeActive/:id', async (req, res) => {
    try{
        await aboutModel.findOneAndUpdate({active: true}, {active: false});
        const about = await aboutModel.findByIdAndUpdate(req.params.id, {active: true}, {returnDocument: 'after'});
        res.status(200).json(about);
    }catch (err){
        console.log(err);
        res.status(500).json({"error": "something went wrong"});
    }
});

router.delete('/delete/:id', async (req, res)=>{
    try {
        await aboutModel.findByIdAndUpdate(req.params.id, {isDeleted: true, active: false});
        res.status(200).json({"msg": "deleted about"})
    }catch (err){
        console.log(err);
        res.status(500).json({"error": "something went wrong"});
    }
});


router.post('/add', async (req, res)=>{
    try{
        const about = await aboutModel.create({
            text: req.body.text, 
            title: req.body.title, 
            email: req.body.email, 
            address: req.body.address, 
            phone: req.body.phone, 
            active: false, 
            isDeleted: false,
            socials: req.body.socials
        });
        res.status(201).json(about);
    }catch (err){
        console.log(err);
        res.status(500).json({"error": "something went wrong"})
    }
});

module.exports = router;
