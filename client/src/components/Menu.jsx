import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Menu = ({category}) => {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/posts/?category=${category}`, {withCredentials: true})
        console.log(response);
        setPosts(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, [category])
  return (
    <div className="menu">
      <h1>Other posts you may like</h1>
      {posts.map(post => (
        <div className="post" key={post.id}>
          <img src={post.img} alt="" />
          <h1>{post.title}</h1>
          <button>Read more</button>
        </div>
      ))}
    </div>
  )
}

export default Menu