import React, { useState, useRef } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import "./Write.css";

import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

// import firebase from '../../config/firebase-config';


const Write = (props) => {

  // const [title, setTitle] = useState("");
  // const [tag, setTag] = useState([]);
  // const [content, setContent] = useState("");
  // const [cover, setCover] = useState("");
  // const imageRef = useRef(null)

  // const addPost = async (e) => {
  //   e.preventDefault();

  //   let post = {
  //     title,
  //     tag,
  //     content,
  //     cover: cover[0]
  //   }
  //   await firebase.createModelPost(post).then(()=>{
  //     console.log("post create succese")
  //   }).catch(err => {
  //     console.log(err)
  //   })

  // }

  // const [open, setOpen] = useState(false);

  // const handleOpen = () => setOpen(!open);

  // const addTag = (tagValue) => {
  //   setTag(prevTags => {
  //     if (prevTags.includes(tagValue)) {
  //       return prevTags.filter(tag => tag !== tagValue);
  //     } else {
  //       return [...prevTags, tagValue];
  //     }
  //   });
  // };

  return (
    // <div className="Write">
    //   <div className='form-wrapper'>

    //     {/* add title */}
    //     <input className="title-input" type='text' placeholder='제목' onChange={(e) => setTitle(e.target.value)} name="title" />
    //     <Button onClick={handleOpen} variant="gradient">
    //       Select Tag
    //     </Button>
    //     <br />

    //     {/* add Tag */}
    //     <Dialog
    //       open={open}
    //       handler={handleOpen}
    //       animate={{
    //         mount: { scale: 1, y: 0 },
    //         unmount: { scale: 0.9, y: -100 },
    //       }}
    //     >
    //       <DialogHeader>Its a simple dialog.</DialogHeader>
    //       <DialogBody>
    //         The key to more success is to have a lot of pillows. Put it this way,
    //         it took me twenty five years to get these plants, twenty five years of
    //         blood sweat and tears, and I&apos;m never giving up, I&apos;m just
    //         getting started. I&apos;m up to something. Fan luv.
    //       </DialogBody>
    //       <DialogBody>
    //         <Button
    //           variant={tag.includes(0) ? "filled" : "outlined"}
    //           onClick={() => addTag(0)}
    //         >
    //           Man
    //         </Button>
    //         <Button
    //           variant={tag.includes(1) ? "filled" : "outlined"}
    //           onClick={() => addTag(1)}
    //         >
    //           Woman
    //         </Button>
    //       </DialogBody>
    //       <DialogFooter>
    //         <Button
    //           variant="text"
    //           color="red"
    //           onClick={handleOpen}
    //           className="mr-1"
    //         >
    //           <span>Cancel</span>
    //         </Button>
    //         <Button variant="gradient" color="green" onClick={handleOpen}>
    //           <span>Confirm</span>
    //         </Button>
    //       </DialogFooter>
    //     </Dialog>
    //     <br />

    //     {/* add File Button */}
        
    //     <input type="file" hidden ref={imageRef} />
        
    //     <form>
    //       <label>Files</label>
    //       <input type="file" onChange={(e) => setCover(e.target.files)}></input>
    //     </form>
        
    //     {/* Content */}
    //     <CKEditor
    //       editor={ClassicEditor}
    //       data="<p>Hello from CKEditor 5!</p>"
    //       onReady={editor => {
    //         // You can store the "editor" and use when it is needed.
    //         console.log('Editor is ready to use!', editor);
    //       }}
    //       onChange={(event, editor) => {
    //         const data = editor.getData();
    //         console.log({ event, editor, data });
    //         setContent(data)
    //       }}
    //     />


    //   </div>
    //   <button className="submit-button" onClick={addPost}>입력</button>
    // </div>
    <div></div>
  );
};

export default Write;