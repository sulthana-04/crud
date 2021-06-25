const { Router} = require('express');
const router = require('express').Router();
const Post = require('../model/Post');

///Post
router.post('/', async(req,res) =>{
    const posts = new Post({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        job: req.body.job,
    });
    try{
        const savedPost = await posts.save();
        res.json({savedPost});
    }catch(err){
     return   res.json({message:err});
    }
});

//get operation
router.get('/',async(req,res,next) =>{
    try{
        const posts = await Post.find();
        res.json(posts);
    }catch(err){
        return res.json({message:err});
    }
});
///update operation

router.patch('/:postId', async (req,res) =>{
    try{
        const updatedPost = await Post.update(
            {_id:req.params.postId},
            {$set :{ name: req.body.name}},
            
        );
        res.json(updatedPost);
    }catch(err){
        return res.json({message:err})
    }
});
///dlt operation
router.delete('/:postId' , async (req,res) => {
    try{
        const removedPost = await Post.remove({_id: req.params.postId});
       res.json(removedPost);
    }catch(err){
        return res.json({ message:err });
    }
});

 module.exports = router;