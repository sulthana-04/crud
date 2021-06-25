const { Router }= require('express');
const router=require('express').Router();
const User=require('../model/User');
const bcrypt=require('bcryptjs');
const jwt= require('jsonwebtoken');
const {registerValidation,loginValidation}= require ('./validation');

router.post('/register',async (req,res) =>{
    //check validation
    const {error} = registerValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    //check email 
    const emailExist = await User.findOne({email:req.body.email});
    if(emailExist) return res.status(400).send('Email already exist')
    //hashedpassword
   const salt = await bcrypt.genSalt(10);
   const hashedPassword = await bcrypt.hash(req.body.password,salt)
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
    });
    try{
        const SavedUser= await user.save();
        res.send({user:user._id});
    }catch(err) {
        res.status(400).send(err);
    }

});
//login 
router.post('/login',async (req,res) =>{
             ///check validation
        const {error} = loginValidation(req.body);
        if(error) return res.status(400).send(error.details[0].message)   
        //check email
        const user = await User.findOne({email:req.body.email});
        if(!user) return res.status(400).send('Email not found')
        //check password
        const validPass = await bcrypt.compare(req.body.password,user.password);
        if(!validPass) return res.status(401).send('Invalid Password')
        //crt n assgn token
         const token = jwt.sign({_id:user._id}, '${process,env.SECRET_KEY}');
         res.header('auth-token', token).send(token)
        //res.send('Loggedin!') 
})

module.exports=router;
