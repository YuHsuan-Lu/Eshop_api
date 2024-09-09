const { expressjwt }= require('express-jwt')
function authJWT(){
    const secret = process.env.JWT_SECRET
    return expressjwt({
        secret,
        algorithms : ['HS256']
    }).unless({
        path:[
            {url:`${process.env.API_URL}/products`,methods:['GET','OPTIONS']},
            `${process.env.API_URL}/users/login`,
            `${process.env.API_URL}/users/signup`
        ]
    })
}
module.exports = authJWT

