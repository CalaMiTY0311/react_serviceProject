const express = require('express');
const register = express.Router();
const FirebaseAuthController = require('./authControllers.js'); 

register.post('/register', (req, res) => {
    FirebaseAuthController.registerUser(req, res);
});

module.exports = register;