const jwt = require('jsonwebtoken');
const User = require('../models/user_model');

const auth_admin = async (req, res, next) => {
    try {
        // const token = req.header('Authorization').replace('Bearer ', '');
        const token = req.cookies.token;
        const decoded = jwt.verify(token, 'secretCode');
        const user = await User.findOne({ _id: decoded._id, 'tokens.token': token});
        if(!user.isAdmin){
            throw new Error();
        }
        req.token = token;
        req.user = user;
        next();
    }
    catch (e) {
        res.status(401).send({e: 'You dont have permission!'});
    }
}

module.exports = auth_admin;