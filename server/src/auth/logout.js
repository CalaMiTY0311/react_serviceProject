const express = require('express');
const logout = express.Router();
const FirebaseAuthController = require('./authControllers.js'); 

logout.post('/logout', (req, res) => {
    FirebaseAuthController.logoutUser(req, res);
});

module.exports = logout;