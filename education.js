const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const EducationSchema = new mongoose.Schema({
    degree: {type: String, required: true}, 
    institute: {type: String, required: true}, 
    startDate: Date, 
    endDate: Date, 
    gpa: Number, 
    isDeleted: Boolean
});

const educationModel = mongoose.model('education', EducationSchema);

router.get('/', async (req, res)=>{
    try {
        const edus = await educationModel.find({isDeleted: false});
        res.status(200).json(edus);
    }catch (err){
        console.log(err);
        res.status(500).json({"error": "something went wrong"});
    }
});


router.get('/:id', async (req, res)=>{
    const id = req.params.id;
    try {
        const edus = await educationModel.findById(id);
        res.status(200).json(edus);
    }catch (err){
        console.log(err);
        res.status(500).json({"error": "something went wrong"});
    }
});

router.put('/edit/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const edu = await educationModel.findByIdAndUpdate(id, {
            degree: req.body.degree, 
            institute: req.body.institute, 
            startDate: req.body.startDate, 
            endDate: req.body.endDate, 
            gpa: req.body.gpa}, {returnDocument: "after"});
        res.status(200).json(edu);
    }catch (err){
        console.log(err);
        res.status(500).json({"error": "something went wrong"});
    }
});

router.delete('/delete/:id', async (req, res) => {
    const id = req.params.id;
    try {
        await educationModel.findByIdAndUpdate(id, {isDeleted: true});
        res.status(200).json({msg: "education deleted"});
    }catch (err) {
        console.log(err);
        res.status(500).json({"error": "something went wrong"});
    }
})

router.post('/add', async (req, res) => {
    try{
        const edu = await educationModel.create({
            degree: req.body.degree, 
            institute: req.body.institute, 
            startDate: req.body.startDate, 
            endDate: req.body.endDate, 
            gpa: req.body.gpa, 
            isDeleted: false});
        res.status(200).json(edu);
    }catch (err){
        console.log(err);
        res.status(500).json({"error": "something went wrong"});
    }
});


module.exports = router;