const express = require('express');
const mongoose = require('mongoose');

const router = express.Router();
const experienceSchema = new mongoose.Schema({
    position: String,
    company: String,
    startDate: Date,
    endDate: Date,
    desc: String,
});
const experienceModel = mongoose.model("experience", experienceSchema);

router.get('/', async (req, res) => {
    try {
        const experiences = await experienceModel.find();
        res.status(200).json(experiences);
    } catch (err) {
        console.log(err);
        res.status(500).json({"error": "something went wrong"});
    }
});

router.get('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const experience = await experienceModel.findById(id);
        res.status(200).json(experience);
    }catch (err) {
        console.log(err);
        res.status(500).json({"error": "something went wrong"});
    }
});

router.put('/edit/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const experience = await experienceModel.findByIdAndUpdate(id, {
            position: req.body.position,
            company: req.body.company,
            startDate: req.body.startDate,
            endDate: req.body.endDate,
            desc: req.body.desc,
        }, {returnDocument: 'after'});
        
        res.status(200).json(experience);
    }catch (err){
        console.log(err);
        res.status(500).json({"error": "something went wrong"});
    }
});

router.delete('/delete/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const experience = await experienceModel.findByIdAndDelete(id);
        res.status(200).json(experience);
    }catch (err){
        console.log(err);
        res.status(500).json({"error": "something went wrong"});
    }
});

router.post('/add', async (req, res)=>{
    try{
        const experience = await experienceModel.create({
            position: req.body.position,
            company: req.body.company,
            startDate: req.body.startDate,
            endDate: req.body.endDate,
            desc: req.body.desc,
        });

        res.status(200).json(experience);
    }catch (err){
        console.log(err);
        res.status(500).json({"error": "something went wrong"});
    }
});


module.exports = router;