const express = require('express')
const router = express()
const Product = require('../Models/product')
const multer = require('multer')
const Category = require('../Models/category')
const { default: mongoose } = require('mongoose')

file_extension_map = {
    "image/png":"png",
    "image/jpeg":"jpeg",
    "image/jpg":"jpg"
}
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // it'll raise error if no such folder exist
      cb(null, 'public/uploads')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix + '.' + file_extension_map[file.mimetype])
    }
  })
  
  const upload = multer({ storage: storage })
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
    }
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
router.post(`/`,upload.single('image'),async(req,res)=>{
    const category = await Category.findById(req.body.category)
    if(!category) res.status(404).send({message:"category not found"})

    const file = req.file
    if(!file)res.status(404).send({message:"file not found"})

    const fileName = `${req.protocol}://${req.get('host')}/public/uploads/${req.file.filename}`
    const product=new Product({
        name:req.body.name,
        description:req.body.description,
        richDescription:req.body.richDescription,
        image:fileName,
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
router.put('/gallery-images/:productId',upload.array('images',10), async(req,res)=>{
    if(!mongoose.isValidObjectId(req.params.productId)) res.status(400).send({message:"invalid id"})
    let files = req.files
    if(!files) res.status(404).send({message:"images not found"})
    let imagePaths = []
    files.map(file=>imagePaths.push(`${req.protocol}://${req.get('host')}/public/uploads/${file.filename}`))
    let product = await Product.findByIdAndUpdate(
        req.params.productId,
        {
            images:imagePaths
        },
        {new:true}
    )
    if(!product){res.status(404).send({success:false,message:"product not found"})}
    res.status(200).send(product)
})
module.exports = router