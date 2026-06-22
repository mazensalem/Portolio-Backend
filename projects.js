const express = require('express');
const mongoose = require('mongoose');
const upload = require('./util/uploads');
const router = express.Router();

const projectSchema = new mongoose.Schema({
    title: {type: String, required: true},
    GitHub: String,
    desc: String,
    Date: Date,
    isActive: Boolean,
    isDeleted: Boolean
});

const projectModel = mongoose.model("projects", projectSchema);

router.get('/', async (req, res)=>{
    try {
        const projects = await projectModel.find({isDeleted: false});
        res.status(200).json(projects);
    }catch (err){
        console.log(err);
        res.status(500).json({"error": "something went wrong"});
    }
});

router.get('/getActive', async (req, res)=>{
    try {        
        const projects = await projectModel.find({isDeleted: false, isActive: true});
        res.status(200).json(projects);
    }catch (err){
        console.log(err);
        res.status(500).json({"error": "something went wrong"});
    }
});

router.get('/:id', async (req, res)=>{
    const id = req.params.id;
    try {
        const project = await projectModel.findById(id);
        res.status(200).json(project);
    }catch (err){
        console.log(err);
        res.status(500).json({"error": "something went wrong"});
    }
});


router.put('/edit/:id', upload.single('img'), async (req, res)=>{
    const id = req.params.id;
    const imgUrl = req.file.filename;
    try{
        const project = await projectModel.findByIdAndUpdate(id, {
            title: req.body.title,
            GitHub: req.body.GitHub,
            desc: req.body.desc,
            Date: req.body.Date,
            imgUrl,
            isActive: req.body.isActive
        }, {returnDocument: 'after'});
        res.status(200).json(project);
    }catch (err){
        console.log(err);
        res.status(500).json({"error": "something went wrong"});
    }
});

router.delete('/delete/:id', async (req, res)=>{
    const id = req.params.id;
    try {
        await projectModel.findByIdAndUpdate(id, {isDeleted: true});
        res.status(200).json({"msg": "the project is deleted"})
    }catch (err){
        console.log(err);
        res.status(500).json({"error": "something went wrong"});
    }
});

router.post('/add', upload.single('img'), async (req, res)=>{
    try{
        const imgUrl = req.file.filename;
        const project = await projectModel.create({
            title: req.body.title,
            GitHub: req.body.GitHub,
            desc: req.body.desc,
            Date: req.body.Date,
            imgUrl,
            isActive: req.body.isActive,
            isDeleted: false
        });
        res.status(200).json(project);
    }catch (err){
        console.log(err);
        res.status(500).json({"error": "something went wrong"});
    }
});


module.exports = router;