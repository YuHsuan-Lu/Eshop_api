const express = require('express')
const router = express()
const Product = require('../Models/product')
// router.get(`/`,async(req,res)=>{
//     const productList = await Product.find()//.select("name price -_id")
//     res.send(productList)
// })
router.get('/:productId',async(req,res)=>{
    const product = await Product.findById(req.params.productId)
    if(!product){res.status(401).send({success:false, message:"product not found"})}
    res.status(200).send(product)
})
router.get('/',async(req,res)=>{
    //when filter is empty, it'll get all the products
    let filter = {}
    if(req.query.categories){ 
        filter = {category: req.query.categories.split(',')}
        console.log(1)
    }
    // console.log({category:"66d9197e2c582297419ba56f"})
    const filteredProduct = await Product.find(filter)
    res.status(200).send(filteredProduct) 
})
router.get('/get/count',async(req,res)=>{
    const productCount = await Product.countDocuments()
    res.status(200).send({productCount})
})
router.get('/get/featured/:count',async(req,res)=>{
    const count = Number(req.params.count)
    const featuredList = await Product.find({isFeatured:true}).limit(count)
    res.status(200).send(featuredList)
})
router.post(`/`,(req,res)=>{
    const product=new Product({
        name:req.body.name,
        description:req.body.description,
        richDescription:req.body.richDescription,
        image:req.body.image,
        images:req.body.images,
        brand:req.body.brand,
        price:req.body.price,
        category:req.body.category,
        countInStock:req.body.countInStock,
        rating:req.body.rating,
        numReviews:req.body.numReviews,
        isFeatured:req.body.isFeatured,
        dateCreated:req.body.dateCreated
    })
    product.save()
    .then((createdProduct)=>{res.status(201).json(createdProduct)})
    .catch((err)=>{res.status(400).json({error:err, success:false})})
})
router.delete('/:productId',async(req,res)=>{
    const product = await Product.findByIdAndDelete(req.params.productId)
    if(!product) res.status(404).send({success:false, message:"deletion fail"})
    res.send({success:true,message:"deletion success"})
})
module.exports = router