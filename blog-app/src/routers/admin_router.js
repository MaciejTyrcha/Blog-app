const express = require('express');
const router = express.Router();
const User = require('../models/user_model');
const auth_admin = require('../middleware/auth_admin');

router.get('/users',auth_admin ,async (req, res) => {
    try {
        const readUsers = await User.find({});
        res.status(200).send(readUsers);
    }
    catch (e){
        res.status(500).send({
            e: 'Cannot read all users!',
        });
    }
});

router.get('/users/:id',auth_admin ,async (req, res) => {
    const _id = req.params.id;
    try {
        const user = await User.findById(_id);
        !user ? res.status(404).send() : res.status(200).send(user);
    }
    catch (e) {
        res.status(500).send({
            e: 'User doesnt exist!',
        });
    }
});

router.patch('/users/:id', auth_admin, async (req, res) => {
    const userParams = Object.keys(req.body);
    const allowedUpdates = ['email', 'password', 'firstName', 'lastName', 'age'];
    const isValidOperations = userParams.every(userParam => allowedUpdates.includes(userParam));
    const _id = req.params.id;

    if(!isValidOperations){
        return res.status(400).send({error: 'Invalid field updates!'});
    }
    try {
        const user = await User.findById(_id);
        userParams.forEach(param => user[param] = req.body[param]);
        await user.save();
        res.status(200).send(user);
    }
    catch (e) {
        res.status(400).send({
            e: 'User doesnt exist!',
        });
    }
});

router.delete('/users/:id',auth_admin, async (req, res) => {
    const _id = req.params.id;
    try {
        const user = await User.findByIdAndDelete(_id);
        !user ? res.status(404).send() : res.status(200).send(user);
    }
    catch (e) {
        res.status(500).send({
            e: 'User doesnt exist!',
        });
    }
});

module.exports = router;