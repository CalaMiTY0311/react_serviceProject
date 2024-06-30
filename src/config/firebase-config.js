import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import 'firebase/compat/analytics';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
  };
  
// class Firebase{
//   constructor () {  // 뜻(생성자)
//       firebase.initializeApp(firebaseConfig);
//       this.auth = firebase.auth();
//       this.db = firebase.firestore();
//   }

//   async SignUp(name,email,password){
//     const user = await firebase.auth().createUserWithEmailAndPassword(email,password).catch(err => {
//       console.log(err)
//       return err;
//     })
//     const Info = {
//       uid: user.user.uid,
//       name: name,
//       email: email,
//       bio:"",
//       profilePicURL:"",
//       follwers:[],
//       following:[],
//       posts:[],
//       createdAt:Date.now()
//     }
//     await this.db.collection('userInfo').doc(user.user._delegate.uid).set(Info).catch(err=>{
//       console.log(err)
//       return err
//     });
//     return user;
//   }
  
//   async login(email, password){
//     const user = await firebase.auth().signInWithEmailAndPassword(email, password).catch(err => {
//       console.log(err);
//       return err;
//     })
//     return user;
//   }

//   async logout(){
//     const logout = await firebase.auth().signOut().catch(err => {
//       console.log(err)
//       return err;
//     })
//     return logout
//   }

//   async getUserState(){
//     return new Promise(resolve=>{
//       this.auth.onAuthStateChanged(resolve)
//     })
//   }

//   async getUserName(uid){
//     const doc = await this.db.collection("userInfo").doc(uid).get();
//     const username = doc.data().name
//     return username
//   }

//   async getModelPosts(){
//     let postsArray = [];
//     const posts = await firebase.firestore().collection("modelPosts").get();
//     posts.forEach(doc=>{
//       postsArray.push({id:doc.id,data:doc.data()});
//     });
//     return postsArray;
//   }

//   async getModelPost(postid){
//     const post = await firebase.firestore().collection("modelPosts").doc(postid).get();
//     const modelPostData = post.data();
//     return modelPostData
//    }

//   async createModelPost(post){
//     const storageRef = firebase.storage().ref();
//     const storageChild = storageRef.child(post.cover.name);
//     const postCover = await storageChild.put(post.cover)
//     console.log("postcover.ref._delegate : ", postCover.ref._delegate._location)
//     const downloadURL = await storageChild.getDownloadURL();
//     // const fileRef = postCover.ref._delegate._location.path_
//     // const fileRef = postCover.ref.location.path;
//     const fileRef = postCover.ref._delegate._location.path_;

//     const newPost = {
//       title: post.title,
//       content: post.content,
//       cover: downloadURL,
//       fileref: fileRef
//     }
//     console.log(newPost)
//     const firestorePost = await firebase.firestore().collection("modelPosts").add(newPost).catch(err => {
//       console.log(err);
//       return err
//     })
//     return firestorePost
//   }
// }

// export default new Firebase();

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);
const storage = getStorage(app);

export { app, auth, firestore, storage };