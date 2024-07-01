const jwt = require('jsonwebtoken') ;
const User = require("../models/user");


const requireAuth = async (req,res,next) => {

    const { authorization } = req.headers ;

    if(!authorization)
    {
        return res.status(401).json({error: 'Authorization token required'}) ;
    }
    //bearer ibiufiefbpabf9uw38h27sbj
    const token = authorization.split(' ')[1] ;
    console.log(token) ;

    try {
        const { _id } = jwt.verify(token,process.env.SECRET) ;
        req.user = await User.findOne({_id}).select('_id') ;
        next() ;
    } catch (error) {
        console.log(error)
        res.status(401).json({error: 'Request is not authorized'})
    }
}

module.exports = requireAuth ;