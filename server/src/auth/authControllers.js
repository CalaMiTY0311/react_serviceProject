const { 
  // getAuth, 
  auth,
  firestore,
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  // sendEmailVerification,
  // sendPasswordResetEmail
 } = require('../config/firebase.js');

//  const { collection, doc, getDocs, query, setDoc, where } = require("firebase/firebase");
 const {  collection, getDoc, doc, query, setDoc, where } = require('firebase/firestore');

class FirebaseAuthController {
    registerUser(req, res) {
      const { email, password, username } = req.body;
      if (!email || !password || !username) {
        return res.status(422).json({
          username: "username is required",
          email: "Email is required",
          password: "Password is required",
        });
      }
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const userInfo = userCredential.user
          const newUserDoc = {
            uid: userInfo.uid,
            username: username,
            email: email,
          username: email.split('@')[0],
          bio: "",
            profilePicURL: "",
          followers: [],
      following: [],
      posts: [],
      createdAt: Date.now(),
          }
          setDoc(doc(firestore, "users", userInfo.uid), newUserDoc);
          res.status(200).json({"message": "welcome ",email,userCredential})
        })
        .catch((error) => {
          const errorMessage = error.message || "An error occurred while registering user";
          res.status(500).json({ error: errorMessage });
        });
    }

    loginUser(req, res) {
      const { email, password } = req.body;
      if (!email || !password) {
          return res.status(422).json({
              email: "Email is required",
              password: "Password is required",
          });
      }
  
      signInWithEmailAndPassword(auth, email, password)
          .then((userCredential) => { 
              const idToken = userCredential._tokenResponse.idToken;
              const refreshToken = userCredential._tokenResponse.refreshToken;
              const docRef = doc(firestore, "users", userCredential.user.uid);
  
              return getDoc(docRef).then((docSnap) => {
                  if (docSnap.exists() && idToken) {
                      res.setHeader('access_token', idToken);
                      res.cookie('refresh_token', refreshToken, {
                          // httpOnly: true,
                          secure: process.env.NODE_ENV === 'production',
                          sameSite: 'None',
                          maxAge: 60 * 60 * 24 * 7 * 1000,
                      });
                      res.status(200).json({ 
                          message: "User logged in successfully",
                          user: docSnap.data()
                      });
                  } else {
                      res.status(404).json({ error: "Internal Server Error" });
                  }
              });
          })
          .catch((error) => {
              console.error(error);
              const errorMessage = error.message || "An error occurred while logging in";
              res.status(500).json({ error: errorMessage });
          });
  }

      logoutUser(req, res) {
        signOut(auth)
          .then(() => {
            // res.clearCookie('access_token');
            res.clearCookie('refresh_token');
            res.status(200).json({ message: "User logged out successfully" });
          })
          .catch((error) => {
            console.error(error);
            res.status(500).json({ error: "Internal Server Error" });
          });
    }
     
  }
  
  module.exports = new FirebaseAuthController();