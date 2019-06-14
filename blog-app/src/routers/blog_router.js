const express = require('express');
const router = express.Router();
const Blog = require('../models/blog_model');
const auth_admin = require('../middleware/auth_admin');

router.post('/blogs', auth_admin, async (req, res) => {
    const blog = new Blog({
        ...req.body,
        owner: req.user._id,
    });
    try {
        await blog.save();
        res.status(201).send(blog);
    }
    catch (e) {
        res.status(400).send({e: 'Cannot create new blog!'});
    }
});

router.get('/blogs', async (req, res) => {
   try {
        const blogs = await Blog.find({});
        res.status(200).send(blogs);
   }
   catch (e) {
       res.status(500).send({e: 'Cannot read all blogs!'});
   }
});

router.get('/blogs/:id', auth_admin, async (req, res) => {
   const _id = req.params.id;
   try {
       const blog = await Blog.findById(_id);
       !blog ? res.status(404).send() : res.status(200).send(blog);
   }
   catch (e) {
       res.status(500).send({e: 'Blog doesnt exist!'});
   }
});

router.patch('/blogs/:id', auth_admin ,async (req, res) => {
    const blogParams = Object.keys(req.body);
    const _id = req.params.id;
    const allowedUpdates = ['artist', 'album', 'description', 'rating'];
    const isValidOperations = blogParams.every(blogParam => allowedUpdates.includes(blogParam));
    if(!isValidOperations){
        res.status(400).send({error : 'Invalid field updates!'});
    }
    try {
        const blog = await Blog.findById(_id);
        blogParams.forEach(param => blog[param] = req.body[param]);
        await blog.save();
        !blog ? res.status(404).send() : res.status(200).send(blog);
    }
    catch (e) {
        res.status(500).send({e: 'Blog doesnt exist!'});
    }
});

router.delete('/blogs/:id',auth_admin ,async (req, res) => {
    const _id = req.params.id;
    try {
        const blog = await Blog.findByIdAndDelete(_id);
        !blog ? res.status(404).send() : res.status(200).send(blog);
    }
    catch (e) {
        res.status(500).send({e: 'Blog doesnt exist!'});
    }
});

module.exports = router;

