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
  // const posts = [
  //   {
  //     id: 0,
  //     title: "Lorem ipsum dolor sit.",
  //     desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero, maxime?",
  //     img: "https://images.pexels.com/photos/16600249/pexels-photo-16600249/free-photo-of-bicycle-parked-by-building-wall.jpeg"
  //   },
  //   {
  //     id: 1,
  //     title: "Lorem ipsum dolor sit.",
  //     desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero, maxime?",
  //     img: "https://images.pexels.com/photos/16643017/pexels-photo-16643017/free-photo-of-cat-shaving-on-tree.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
  //   },
  //   {
  //     id: 2,
  //     title: "Lorem ipsum dolor sit.",
  //     desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero, maxime?",
  //     img: "https://images.pexels.com/photos/12024680/pexels-photo-12024680.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
  //   },
  //   {
  //     id: 3,
  //     title: "Lorem ipsum dolor sit.",
  //     desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero, maxime?",
  //     img: "https://images.pexels.com/photos/12181253/pexels-photo-12181253.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
  //   },
  // ]

  return (
    <div className="posts">
      {posts.map(post => (
        <div className="post" key={post.id}>
          <div className="img">
            <img src={post.img}/>
          </div>
          <div className="content">
            <Link className="link" to={`/post/${post.id}`}><h1>{post.title}</h1></Link>
            <p>{post.description}</p>
            <Link className='readmore-btn' to={`/post/${post.id}`}>Read more</Link>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Home