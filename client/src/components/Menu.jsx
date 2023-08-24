import React from 'react'

const Menu = () => {
  const posts = [
    {
      id: 0,
      title: "Lorem ipsum dolor sit.",
      desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero, maxime?",
      img: "https://images.pexels.com/photos/16600249/pexels-photo-16600249/free-photo-of-bicycle-parked-by-building-wall.jpeg"
    },
    {
      id: 1,
      title: "Lorem ipsum dolor sit.",
      desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero, maxime?",
      img: "https://images.pexels.com/photos/16643017/pexels-photo-16643017/free-photo-of-cat-shaving-on-tree.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    },
    {
      id: 2,
      title: "Lorem ipsum dolor sit.",
      desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero, maxime?",
      img: "https://images.pexels.com/photos/12024680/pexels-photo-12024680.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    },
    {
      id: 3,
      title: "Lorem ipsum dolor sit.",
      desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero, maxime?",
      img: "https://images.pexels.com/photos/12181253/pexels-photo-12181253.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    },
  ]

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