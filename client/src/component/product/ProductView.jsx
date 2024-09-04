import { useState,useEffect } from 'react';
import { useCartActions } from "../../store/Store";

import { useParams } from "react-router-dom";
import "./ProductView.css";
import toast from "react-hot-toast";
import data from "../product/data.json"

// import useGetModelPostDetail from "../../hooks/useGetModelPostDetail";
import Comment from "./Comment";

function ProductView({ post }) {
  const { addToCart } = useCartActions();

  // function handleAddToCart() {
  //   addToCart(productData);
  //   toast.success("Added to Cart");
  // }
  const postDetail = post[0];

    const categories = postDetail.category 
    ? Object.keys(postDetail.category).filter(key => postDetail.category[key]).join(', ')
    : '';

  //
  const currentUser = data.currentUser
  const [comments, setComments] = useState(null)
  const [newComment, setNewComment] = useState("")

  useEffect(()=>{
    let chatJson = window.localStorage.getItem('chatJson')
    if(JSON.parse(chatJson)) {
      setComments(JSON.parse(chatJson))
    }
    else {
      setComments(data.comments)
    }
  }, [])

  useEffect(()=>{
    if(comments)
      window.localStorage.setItem('chatJson', JSON.stringify(comments))
  }, [comments])
  
  function handleUpvote(id, isReply, parentId){
    isReply ? 
    setComments(comments => comments.map(comment => {
      return comment.id == parentId ? 
      {...comment, replies: comment.replies.map(reply => {
        return reply.id == id ? {...reply, score: reply.score+1} : reply
      })}
      : comment
    })) 
    : setComments(comments => comments.map(comment => {
      return comment.id == id ? {...comment, score: comment.score+1} : comment
    }))
  }

  function handleDownvote(id, isReply, parentId){
    isReply ? 
    setComments(comments => comments.map(comment => {
      return comment.id == parentId ? 
      {...comment, replies: comment.replies.map(reply => {
        return reply.id == id ? {...reply, score: reply.score-1} : reply
      })}
      : comment
    })) 
    : setComments(comments => comments.map(comment => {
      return comment.id == id ? {...comment, score: comment.score-1} : comment
    }))
  }

  function handleChangeNewComment(e){
    setNewComment(e.target.value)
  }

  function handleAddComment(){
    if(newComment == "")
      return;
    setComments(comments => [...comments,
      {
        id: nanoid(),
        content: newComment,
        createdAt: new Date(),
        score: 0,
        user: currentUser,
        replies: []
      }]
    )
    setNewComment("")
  }

  function handleDelete(id, isReply, parentId){
    isReply ?
    setComments(comments => comments.map(comment => {
      return comment.id == parentId ? 
      {...comment, replies: comment.replies.filter(reply => reply.id != id )}
      : comment
    })) 
    : setComments(comments => comments.filter(comment => comment.id != id ))
  }

  function handleReply(parentId, content, toUser){   
    setComments(comments => comments.map(comment => {
      return comment.id ==  parentId ? {...comment, replies: [...comment.replies, 
        {
          id: nanoid(),
          content: content.startsWith("@" + toUser + " ") ? content.split("@" + toUser + " ")[1] : content,
          score: 0,
          replyingTo: toUser,
          user: currentUser,
          createdAt: new Date()
        }
      ]} : comment
    }))
  }

  function updateComment(id, content, isReply, parentId){
    isReply ? 
    setComments(comments => comments.map(comment => {
      return comment.id == parentId ? 
      {...comment, replies: comment.replies.map(reply => {
        return reply.id == id ? 
        {
          ...reply, 
          content: content.startsWith("@" + reply.replyingTo + " ") ? content.split("@" + reply.replyingTo + " ")[1] : content,
        } 
        : reply
      })}
      : comment
    })) 
    : setComments(comments => comments.map(comment => {
      return comment.id == id ? {...comment, content: content} : comment
    }))
  }
  //


  return (
    <>
    {/* <div className="product-container">
      <div className="product-img_wrapper">
        <img src={postDetail.imageURL} />
      </div>
      <div className="product-info">
        <h2 className="product-name">{postDetail.title}</h2>
        <p className="product-price">{postDetail.body}</p>
        <p className="product-description">{categories}</p>


        <button className="product-cart_btn">
          Add to Cart
        </button>
      </div>  
    </div> */}
    
    {comments && (
  <div className="comments-wrapper">
    <div className="comments-section">
      {comments.map(comment => (
        <Comment 
          currentUser={currentUser} 
          isReply={false} 
          key={comment.id} 
          {...comment} 
          parentId={comment.id} 
          handleReply={handleReply}
          updateComment={updateComment}
          handleDelete={handleDelete}
          handleUpvote={handleUpvote}
          handleDownvote={handleDownvote}
        />
      ))}
    </div>
  </div>
)}
    </>

  );
}

export default ProductView;
