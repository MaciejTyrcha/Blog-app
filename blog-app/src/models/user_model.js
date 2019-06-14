const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Blog = require('./blog_model');
// const passwordValidator = require('password-validator');
//
// const schema = new passwordValidator();

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 20,
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Email is invalid!');
            }
        },
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 6,
        maxlength: 255,
        validate(value){
          if(value.length < 6 ){
              throw new Error('Password must have more than 6 letters!');
          }
        },
    },
    firstName: {
        type: String,
        trim: true,
        minlength: 2,
        maxlength: 50,
    },
    lastName: {
        type: String,
        trim: true,
        minlength: 2,
        maxlength: 50,
    },
    age: {
        type: Number,
        validate(value){
            if(value < 0){
                throw new Error('Age must be positive number!');
            }
        },
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    tokens: [{
        token: {
            type: String,
            required: true,
        }
    }]
});

//method to make relation with blog
userSchema.virtual('blogs', {
    ref: 'Blog',
    localField: '_id',
    foreignField: 'owner',
})

//method to delete fragile options from sending
userSchema.methods.toJSON = function(){
    const user = this;
    const userObject = user.toObject();

    delete userObject.password;
    delete userObject.tokens;

    return userObject;
};

//method to store tokens from every logging in
userSchema.methods.generateAuthToken = async function(){
    const user = this;
    const token = jwt.sign({_id: user._id.toString(), isAdmin: user.type}, "secretCode");
    user.tokens = user.tokens.concat({token});
    await user.save();
    return token;
};

//Function to check if login and userName are valid
userSchema.statics.findByEmail = async (userName, password) => {
    const user = await User.findOne({userName});
    const isMatch = await bcrypt.compare(password, user.password);

    if(!user || !isMatch){
        throw new Error('Unable to login!');
    }

    return user;
};

//function to hash passwords
userSchema.pre('save', async function(){
   const user = this;
   if(user.isModified('password')){
       user.password = await bcrypt.hash(user.password, 8);
   }
});

//function to delete all tasks by an user
userSchema.pre('remove', async function() {
    const user = this;
    await Blog.deleteMany({owner: user._id});
});

const User = mongoose.model('User', userSchema);

module.exports = User;

