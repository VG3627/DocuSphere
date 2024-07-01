const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');
mongoose.pluralize(null) ;
const Schema = mongoose.Schema;

// Define the user schema
const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true
  }
}, {
  timestamps: true // Adds createdAt and updatedAt timestamps
});

userSchema.statics.signup = async function(email,password) {
    
    if(!email || !password)
    {
        throw Error("All fields must be filled!")
    }

    if(!validator.isEmail(email))
    {
        throw Error("Enter valid email!");
    }

    if(!validator.isStrongPassword(password))
    {
        throw Error("Password should be 8 characters long and should at least contain an Uppercase letter,a lowercase letter,a special character and a number !! ") ;
    }
    
    const exists = await this.findOne({email});

    if(exists)
    {
        throw Error("Email already registered!");
    }
    
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password,salt);

    const user = await this.create({email,password:hash}) ;
    return user ;
}

userSchema.statics.login = async function(email,password)
{
  if(!email || !password)
  {
      throw Error("All fields must be filled!")
  }
  
  


  const user = await this.findOne({email}) ;

  if(!user)
  {
    throw Error("Email entered is not registered!") ;
  }
  
  const match = await bcrypt.compare(password,user.password) ;

  if(!match)
  {
     throw Error("Enter correct password!") ;
  }

  return user ;
  
  
}

// Create the model from the schema and export it
const User = mongoose.model('users', userSchema);
module.exports = User;