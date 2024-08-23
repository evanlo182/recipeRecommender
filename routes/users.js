const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/UserModel.js');
const router = express.Router();
const SECRET_KEY = process.env.SECRET_KEY;

//Register a new user: POST to register route
router.post('/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const hashedPass = await bcrypt.hash(password, 10);
        const user = new User({ username, email, password:hashedPass });
        await user.save();
        res.status(201).json({message: 'User registered successfully!'});
    } catch(err){
        res.status(500).json({message: err.message});
    }
});



// Login User: POST to login route
router.post('/login', async (req,res) => {
    try {
        const username = req.body.username;
        const password = req.body.password
        const user = await User.findOne({ username });
        if(!user) {
            return res.status(401).json({message : "No username"});
        }
        const validPass = await bcrypt.compare(password, user.password);
        if (!validPass) {
            return res.status(401).json({message : "Invalid password"});
        }
        const token = jwt.sign({id: user._id}, SECRET_KEY, { expiresIn: '1hr'});
        res.json({message: "Login successful!"});
        res.send({ user, token });
    } catch(err){
        res.status(500).json({ error: err.message });
    }
});

// need to add routes to update, delete, add to user's pantry at slug /:username/pantry


module.exports = router;