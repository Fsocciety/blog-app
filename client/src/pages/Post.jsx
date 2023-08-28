import React, { useContext, useEffect, useState } from 'react'
import {Link, Navigate, useLocation, useNavigate} from 'react-router-dom'
import Edit from '../assets/edit-icon.png'
import Delete from '../assets/delete-icon.png'
import Menu from '../components/Menu.jsx'
import { AuthContext } from "../context/authContext.jsx"
import axios from 'axios';
import moment from 'moment';

const Post = () => {
  const [post, setPost] = useState({})

  const postID = useLocation().pathname.split('/')[2];

  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/posts/${postID}`, {withCredentials: true})
        setPost(response.data[0]);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, [postID])


  const handleDelete = async () => {
    try {
        const response = await axios.delete(`http://localhost:8080/posts/${postID}`, {withCredentials: true})
        navigate("/");
      } catch (error) {
        console.log(error);
      }
  }

  return (
    <div className="post">
      <div className="content">
        <img src={`../upload/${post.img}`}/>
        <div className="user">
          {post.avatar && <img src={post.avatar}/>}
          <div className="info">
            <div className='user-info'>
              <span>{post.username}</span>
              <p>{moment(post.date).fromNow()}</p>
            </div>
            {currentUser.username === post.username &&
            <div className="edit">
              <Link to={`/write?edit=${postID}`} state={post} alt="edit">
                <img src={Edit}/>
              </Link>
              <img onClick={handleDelete} src={Delete}/>
            </div>
            }
          </div>
        </div>
        <h1>{post.title}</h1>
        <p>{post.description}</p>
      </div>
      <Menu category={post.cat}/>
    </div>
  )
}

export default Post