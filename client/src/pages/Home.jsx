import React, { useEffect, useState } from 'react'
import {Link, useLocation} from 'react-router-dom'
import axios from 'axios'


const Home = () => {
  const [posts, setPosts] = useState([])

  const cat = useLocation().search;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/posts/${cat}`, {withCredentials: true})
        console.log(response);
        setPosts(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, [cat])

  const getText = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent;
  }

  return (
    <div className="posts">
      {posts.map(post => (
        <div className="post" key={post.id}>
          <div className="img">
            <img src={`../upload/${post.img}`}/>
          </div>
          <div className="content">
            <Link className="link" to={`/post/${post.id}`}><h1>{post.title}</h1></Link>
            <p>{getText(post.description)}</p>
            <Link className='readmore-btn' to={`/post/${post.id}`}>Read more</Link>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Home