const express = require('express');
const verifyToken = require('../middleware/index.js');
const modelPosts  = express.Router();
const FirebasePostsController = require('./postsControllers.js'); 

modelPosts.get('/modelPosts', verifyToken, FirebasePostsController.getModelPosts)

module.exports = modelPosts;