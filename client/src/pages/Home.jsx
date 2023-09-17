import React, { useEffect, useState } from 'react'
import {Link, useLocation} from 'react-router-dom'
import axios from 'axios'
import parse from 'html-react-parser';

const Home = () => {
  const [posts, setPosts] = useState(null)

  const cat = useLocation().search;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://blog-vhyd.onrender.com/posts/${cat}`, {withCredentials: true})
        setPosts(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, [cat])

  const getText = (html) => {
    html = html.slice(0, 500)
    if (html[html.length - 1] != ' ') {
      html = html.slice(0, -2)
      html += '...'
    } 
    html = parse(html);
    return html
  }

  return (
    <div className="posts">
      {posts ? posts.map(post => (
        <div className="post" key={post.id}>
          <div className="img">
            <img src={post.img}/>
          </div>
          <div className="content">
            <Link className="link" to={`/post/${post.id}`}><h1>{post.title}</h1></Link>
            <div className='small-description'>{getText(post.description)}</div>
            <Link className='readmore-btn' to={`/post/${post.id}`}>Read more</Link>
          </div>
        </div>
      )) : <></>}
    </div>
  )
}

export default Home