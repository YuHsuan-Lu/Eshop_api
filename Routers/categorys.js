const express = require('express')
const Category = require('../Models/category')
const router = express()
router.get('/',async(req,res)=>{
    categoryList = await Category.find()
    res.status(200).send(categoryList)
})
router.get('/:categoryId',async(req,res)=>{
    let category = await Category.findById(req.params.categoryId)
    if(!category){res.status(404).send({success:false,message:"category not found"})}
    res.status(200).send(category)
})
router.put('/:categoryId',async(req,res)=>{
    let category = await Category.findByIdAndUpdate(
        req.params.categoryId,
        {
            name: req.body.name,
            icon: req.body.icon,
            color: req.body.color
        },
        {new:true}
    )
    if(!category){res.status(404).send({success:false,message:"category not found"})}
    res.status(200).send(category)
})
router.post('/',async (req,res)=>{
    const category = new Category({
        name: req.body.name,
        icon: req.body.icon,
        color: req.body.color
    }) 
    createdCategory = await category.save()
    if(!createdCategory){
        res.status('400').send('category creation fails')
    }
    res.status('200').send('category creation success')
})
router.delete('/:CategoryId',(req,res)=>{
    Category.findByIdAndDelete(req.params.CategoryId)
    .then(category=>{
        if(category){res.status(200).send({success:true, message:'category is deleted'})}
        else{res.status(404).send({success:false, message:'category not found'})}
    })
    .catch(err=>{res.status(400).send({success:false, error:err})})
})

module.exports = router
