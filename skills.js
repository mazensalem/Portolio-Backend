const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const skillsSchema = new mongoose.Schema({title: {type: String, required: true}, rating: Number, isDeleted: Boolean, isActive: Boolean});
const skillsModel = mongoose.model('skills', skillsSchema);

router.get('/', async (req, res)=>{
    try {
        const skills = await skillsModel.find({isDeleted: false});
        res.status(200).json(skills);
    }catch (err){
        console.log(err);
        res.status(500).json({"error": "something went wrong"});
    }
});


router.get('/getActive', async (req, res)=>{
    try {
        const skills = await skillsModel.find({isActive: true, isDeleted: false});
        res.status(200).json(skills);
    }catch (err){
        console.log(err);
        res.status(500).json({"error": "something went wrong"});
    }
});

router.get('/:id', async (req, res)=>{
    const id = req.params.id;
    try {
        const skill = await skillsModel.findById(id);
        res.status(200).json(skill);
    }catch (err){
        console.log(err);
        res.status(500).json({"error": "something went wrong"});
    }
});

router.put('/edit/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const skill = await skillsModel.findByIdAndUpdate(id, {title: req.body.title, rating: req.body.rating, isActive: req.body.isActive});
        res.status(200).json(skill);
    }catch (err){
        console.log(err);
        res.status(500).json({"error": "something went wrong"});
    }
});

router.delete('/delete/:id', async (req, res) => {
    const id = req.params.id;
    try {
        await skillsModel.findByIdAndUpdate(id, {isDeleted: true});
        res.status(200).json({"msg": "skill deleted"});
    }catch (err) {
        console.log(err);
        res.status(500).json({"error": "something went wrong"});
    }
})

router.post('/add', async (req, res) => {
    try{
        const skill = await skillsModel.create({title: req.body.title, rating: req.body.rating, isDeleted: false, isActive: req.body.isActive});
        res.status(201).json(skill);
    }catch (err){
        console.log(err);
        res.status(500).json({"error": "something went wrong"});
    }
})


module.exports = router;