const express = require('express')
const router = express()
const Order = require('../Models/order')
const OrderItem = require('../Models/orderItem')

router.get('/',async (req,res)=>{
    const orderList = await Order.find().populate('user',"name").sort({'dateOrderd':-1})//from newest to oldest
    if(!orderList) res.status(404).send({message:"order not found"})
    res.send(orderList)
})
router.get('/:orderId',async (req,res)=>{
    const order = await Order.findById(req.params.orderId)
    .populate('user',"name")
    .populate({path:'orderItem',populate:{path: 'product', populate:'category'}})
    if(!order) res.status(404).send({message:"order not found"})
    res.send(order)
})
router.get('/get/sum',async(req,res)=>{
    const totalSales = await Order.aggregate([
        { $group: { _id: null, totalSales: { $sum: '$totalPrice' }}}
      ]);
    if(!totalSales) res.send({message:"could not generate sum"})
    res.status(200).send({totalSales:totalSales.pop().totalSales})
})
router.get('/get/count',async(req,res)=>{
    const orderCount = await Order.countDocuments()
    if(!orderCount) res.status(400).send({message:"document not found"})
    res.status(200).send({orderCount})
})
//add orderitem before add order
router.post('/',async(req,res)=>{
    //add orderitem
    orderItemIds = await Promise.all(req.body.orderItem.map(async (item)=>{
        let createdOrderItem = new OrderItem({quantity:item.quantity, product:item.product})
        createdOrderItem = await createdOrderItem.save()
        return createdOrderItem._id
    }))
    console.log(orderItemIds)
    //calculate total price
    const totalPrices = await Promise.all(orderItemIds.map(async(id)=>{
        let item = await OrderItem.findById(id).populate('product','price')
        return item.quantity * item.product.price
    }))
    const totalPrice = totalPrices.reduce((a,b)=>a+b,0)
    const newOrder = new Order({
        orderItem:orderItemIds,
        shippingAddress1:req.body.shippingAddress1,
        shippingAddress2:req.body.shippingAddress2,
        city:req.body.city,
        zip:req.body.zip,
        country:req.body.country,
        phone:req.body.phone,
        status:req.body.status,
        totalPrice:totalPrice,
        user:req.body.user,
        dateOrdered:req.body.dateOrdered
    })
    newOrder.save()
    .then((createdOrder)=>res.status(200).send(createdOrder))
    .catch((err)=>res.status(400).send({error:err}))
})
//delete orderitem when delete order
router.delete('/:orderId',async(req,res)=>{
    Order.findByIdAndDelete(req.params.orderId).then((order)=>{
        if(order){
            order.orderItem.map(async(item)=>{
                await OrderItem.findByIdAndDelete(item)
            })
            return res.send("deletion success")
        }
        else{
            return res.status(404).send({message:"order not found"})
        }
    })
    .catch((err)=>{
        console.log(err)
        res.send(err)
    })
})
router.put('/:orderId',async (req,res)=>{
    const order = await Order.findByIdAndUpdate(
        req.params.orderId,
        {
            status: req.body.status
        },
        {new:true}
    )
    if(!order) res.status(404).send({message:"order not found"})
    res.send(order)
})
module.exports = router
