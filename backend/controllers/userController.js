const User = require('../models/user.js');
const jwt = require('jsonwebtoken');


const createToken = (_id) => {

   return  jwt.sign({_id}, process.env.SECRET, {expiresIn : '1h'}) ;
}

module.exports.login_post = async (req,res) => {
    
    const {email , password } = req.body ;
    // console.log(process.env.SECRET) ;
    try {
        const user = await User.login(email,password);

         const token = createToken(user._id);
          
        res.status(200).json({email,token}) ;
    } catch (error) {
        res.status(400).json({error : error.message});
    }
}

module.exports.signup_post = async (req,res) => {
   
    const {email , password } = req.body ;

    try {
        const user = await User.signup(email,password);

         const token = createToken(user._id);

        res.status(200).json({email,token}) ;
    } catch (error) {
        res.status(400).json({error : error.message});
    }
}

module.exports.user_get = async (req,res) => {
    
    try {
        const users = await User.find().sort({CreatedAt:-1})
        res.json(users) ;
    } catch (error) {
        res.json(errors) ;
    }
}