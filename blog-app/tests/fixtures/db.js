const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const User = require('../../src/models/user_model');
const Blog = require('../../src/models/blog_model');

const adminUserId = new mongoose.Types.ObjectId();
const adminUser = {
    _id: adminUserId,
    userName: 'Admin',
    email: 'maciej.tyrcha@o2.pl',
    password: 'admin123',
    firstName: 'Maciej',
    lastName: 'Tyrcha',
    age: 50,
    isAdmin: true,
    tokens: [{
        token: jwt.sign({_id: adminUserId}, 'secretCode'),
    }],
}

const userTwoId = new mongoose.Types.ObjectId();
const userTwo = {
    _id: userTwoId,
    userName: 'Normal user',
    email: 'someemail@gmail.com',
    password: 'dupa1234',
    firstName: 'Zbyszek',
    lastName: 'Looo',
    age: 30,
    isAdmin: false,
    tokens: [{
        token: jwt.sign({_id: userTwoId}, 'secretCode'),
    }],
}

const userThreeId = new mongoose.Types.ObjectId();
const userThree = {
    _id: userThreeId,
    userName: 'Normal user two',
    email: 'someemailtwo@gmail.com',
    password: 'dupa1234',
    firstName: 'Zbyszek 2',
    lastName: 'Looo 2',
    age: 32,
    isAdmin: false,
    tokens: [{
        token: jwt.sign({_id: userThreeId}, 'secretCode'),
    }],
}

const blogOneId = new mongoose.Types.ObjectId();
const blogOne = {
    _id: blogOneId,
    artist: "Soad",
    album: "Mesmerize",
    description: "First blog",
    rating: 5,
    owner: adminUser._id,
}

const setupDatabase = async () => {
    await User.deleteMany();
    await Blog.deleteMany();
    await new User(adminUser).save();
    await new User(userTwo).save();
    await new User(userThree).save();
    await new Blog(blogOne).save();
}

module.exports = {
    adminUser,
    adminUserId,
    userTwo,
    userTwoId,
    userThree,
    userThreeId,
    blogOne,
    blogOneId,
    setupDatabase
}