const express = require('express');
const router = new express.Router();
const User = require('../models/user_model');
const auth = require('../middleware/auth');


router.post('/users', async (req, res) => {
    const user = new User(req.body);
    try {
        await user.save();
        const token = await user.generateAuthToken();
        res.status(201).send({user, token});
    }
    catch (e){
        res.status(400).send({
            e: 'Cannot create new user!',
        });
    }
});

router.get('/users/me', auth, async (req, res) => {
        res.send(req.user);
});

router.post('/users/login', async (req, res) => {
    try {
        const user = await User.findByEmail(req.body.userName, req.body.password);
        const token = await user.generateAuthToken();
        res.cookie('token', token, {httpOnly: true});
        // res.send({user, token});
        // res.setHeader("Content-Type", "text/html")
        // console.log(res);
        res.redirect('/users/me');

    }
    catch (e) {
        res.status(400).send({
            e: 'User doesnt exist!',
        });
    }
});

router.post('/users/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter(token => token.token !== req.token);
        await req.user.save();
        res.clearCookie('token');
        res.send();
    }
    catch (e) {
        res.status(500).send();
    }
});

router.post('/users/logoutAll', auth, async (req, res) => {
   try {
        req.user.tokens = [];
        await req.user.save();
        res.clearCookie('token');
        res.send();
   }
   catch (e) {
       res.status(500).send();
   }
});

router.patch('/users/me', auth, async (req, res) => {
    const userParams = Object.keys(req.body);
    const allowedUpdates = ['email', 'password', 'firstName', 'lastName', 'age'];
    const isValidOperations = userParams.every(userParam => allowedUpdates.includes(userParam));

    if(!isValidOperations){
        return res.status(400).send({error: 'Invalid field updates!'});
    }

    try {
        userParams.forEach(param => req.user[param] = req.body[param]);
        await req.user.save();
        res.status(200).send(req.user);
    }
    catch (e) {
        res.status(400).send({
            e: 'User doesnt exist!',
        });
    }
});

router.delete('/users/me', auth, async (req, res) => {
    try {
        await req.user.remove();
        res.send(req.user);
    }
    catch (e) {
        res.status(500).send({
            e: 'User doesnt exist!',
        });
    }
});

module.exports = router;