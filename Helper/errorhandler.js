function errorHandler(err,req,res,next){
    if(err){
        return res.send(err)
    }
}

module.exports = errorHandler