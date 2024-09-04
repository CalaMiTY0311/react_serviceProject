const { firestore } = require('../config/firebase.js')
const { getFirestore, collection, doc, getDocs, query, setDoc, where } = require('firebase/firestore');

class FirebasePostsController {
    getModelPosts(req,res){
        const q = query(collection(firestore, "posts")); 

        getDocs(q)
  .then((querySnapshot) => {
    const feedPosts = [];
    querySnapshot.forEach((doc) => {
        feedPosts.push({ id: doc.id, ...doc.data() });
    });
    console.log(feedPosts)
    feedPosts.sort((a, b) => b.createdAt - a.createdAt);
    // setPosts(feedPosts);
    res.status(200).json({ "posts" : feedPosts });
  })
  .catch((error) => {
    // 에러 처리
    console.error("Error getting documents: ", error);
    res.status(500).json({ error: errorMessage });
  });
				
        // const feedPosts = [];
    }
}

module.exports = new FirebasePostsController();