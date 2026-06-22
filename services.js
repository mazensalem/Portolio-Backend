const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const upload = require('./util/uploads');

const servicesSchema = new mongoose.Schema({ title: {type: String, required: true}, desc: {type: String}, isDeleted: Boolean, isActive: Boolean, imgUrl: String });
const services = mongoose.model("services", servicesSchema);

router.get('/', async (req, res)=>{
    try {
        const allServices = await services.find({isDeleted: false});
        res.status(200).json(allServices);
    } catch (err) {
        console.log(err);
        res.status(500).json({"error": "something went wrong"});
    }
});

router.get('/getActive', async (req, res)=>{
    try {
        const allActiveServices = await services.find({isActive: true, isDeleted: false});
        res.status(200).json(allActiveServices);
    }catch (err){
        console.log(err);
        res.status(500).json({"error": "something went wrong"});
    }
});

router.get('/:id', async (req, res)=>{
    const id = req.params.id;
    try {
        const service = await services.findById(id);
        res.status(200).json(service);
    }catch (err){
        console.log(err);
        res.status(500).json({"error": "something went wrong"});
    }
});


router.put('/edit/:id', upload.single('img'), async (req, res)=>{
    const id = req.params.id;
    try{
        const imgUrl = req.file.filename;
        const service = await services.findByIdAndUpdate(id, {title: req.body.title, desc: req.body.desc, isActive: req.body.isActive, imgUrl}, {returnDocument: 'after'});
        res.status(200).json(service);
    }catch (err){
        console.log(err);
        res.status(500).json({"error": "something went wrong"});
    }
});

router.delete('/delete/:id', async (req, res)=>{
    const id = req.params.id;
    try {
        await services.findByIdAndUpdate(id, {isDeleted: true});
        res.status(200).json({"msg": "deleted services"})
    }catch (err){
        console.log(err);
        res.status(500).json({"error": "something went wrong"});
    }
});

router.post('/add', upload.single('img'), async (req, res)=>{
    try{
        const imgUrl = req.file.filename;
        const service = await services.create({title: req.body.title, desc: req.body.desc, isDeleted: false, isActive: req.body.isActive, imgUrl});
        res.status(201).json(service);
    }catch (err){
        console.log(err);
        res.status(500).json({"error": "something went wrong"});
    }
});


module.exports = router;