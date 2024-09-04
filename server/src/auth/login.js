const express = require('express');
const login = express.Router();
const FirebaseAuthController = require('./authControllers.js'); 

login.post('/login', (req, res) => {
    FirebaseAuthController.loginUser(req, res);
});

module.exports = login;