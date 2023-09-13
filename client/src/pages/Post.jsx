import React, { useContext, useEffect, useState } from 'react'
import {Link, Navigate, useLocation, useNavigate} from 'react-router-dom'
import Edit from '../assets/edit-icon.png'
import Delete from '../assets/delete-icon.png'
import Menu from '../components/Menu.jsx'
import { AuthContext } from "../context/authContext.jsx"
import axios from 'axios';
import moment from 'moment';

const Post = () => {
  const [post, setPost] = useState({});
  const [comments, setComments] = useState([]);
  const [value, setValue] = useState('');

  const postID = useLocation().pathname.split('/')[2];

  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/posts/${postID}`, {withCredentials: true})
        const res = await axios.get(`http://localhost:8080/comments/${postID}`, {withCredentials: true})
        setPost(response.data[0]);
        setComments(res.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, [postID, comments])


  const handleDelete = async () => {
    try {
        const response = await axios.delete(`http://localhost:8080/posts/${postID}`, {withCredentials: true})
        console.log(response);
        navigate("/");
      } catch (error) {
        console.log(error);
      }
  }

  const handleComment = async () => {
    try {
        const response = await axios.post(`http://localhost:8080/comments`,{
          comment: value,
          date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
          uid: currentUser.id,
          postid: postID
        },
        {withCredentials: true})
        console.log(response);
        setValue('')
      } catch (error) {
        console.log(error);
      }
  }


  return (
    <div className="post">
      <div className="content">
        <img src={post.img}/>
        <div className="user">
          {post.avatar && <img src={post.avatar}/>}
          <div className="info">
            <div className='user-info'>
              <span>{post.username}</span>
              <p>{moment(post.date).fromNow()}</p>
            </div>
            {currentUser ? (currentUser.username === post.username &&
            <div className="edit">
              <Link to={`/write?edit=${postID}`} state={post} alt="edit">
                <img src={Edit}/>
              </Link>
              <img onClick={handleDelete} src={Delete}/>
            </div>
            ) : (<></>)}
          </div>
        </div>
        <h1>{post.title}</h1>
        <p>{post.description}</p>
        <div className="comments">
          <h1>Comments</h1>
          {comments && comments.map(comment => (
            <div key={comment.id} className="comment">
              <div className="user">
                <img src={comment.avatar} alt="avatar" />
                <h2>{comment.username}</h2>
              </div>
              <p>{comment.comment}</p>
            </div>
          ))}
          {currentUser ? (
          <div className="input">
            <h2>{currentUser.username}</h2>
            <textarea maxLength='255' className='comment-input' value={value} onChange={(e) => setValue(e.target.value)}/>
            <button onClick={handleComment}>Comment</button>
          </div>
          ) : (
          <div className="input">
            <div className='not-auth'>You have to be logged in to comment.  <Link className='login' to={'/login'}>Login</Link></div>
            <textarea maxLength='255' className='comment-input' value={value} onChange={(e) => setValue(e.target.value)}/>
            <button disabled='true' onClick={handleComment}>Comment</button>
          </div>
          )}
          
        </div>
      </div>
      <Menu category={post.cat}/>
    </div>
  )
}

export default Post