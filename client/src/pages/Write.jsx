import React, { useState } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import 'react-quill/dist/quill.bubble.css'
import axios from 'axios'
import { useLocation, useNavigate } from 'react-router-dom'
import moment from 'moment';

const Write = () => {
  const state = useLocation().state;

  const [value, setValue] = useState(state?.description || '');
  const [title, setTitle] = useState(state?.title || '');
  const [image, setImage] = useState(null);
  const [category, setCategory] = useState(state?.cat || '');

  const navigate = useNavigate();


  const upload = async () => {
    const formData = new FormData();
    formData.append("file", image);
    try {
      const response = await axios.post(`https://blog-vhyd.onrender.com/posts/upload`, formData, {withCredentials: true})
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }

  const publish = async (e) => {
    e.preventDefault();
    const { imageUrl } = await upload();
    
    try {
      state ? await axios.put(`https://blog-vhyd.onrender.com/posts/${state.id}`, {
        title,
        desc: value,
        category,
        img: imageUrl
      }, {withCredentials: true}).then((response) => {
        console.log(response);
      })
      :
      await axios.post(`https://blog-vhyd.onrender.com/posts`, {
        title,
        desc: value,
        category,
        img: imageUrl,
        date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss")
      }, {withCredentials: true}).then((response) => {
        console.log(response);
      })
      navigate('/')
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="add">
      <div className="content">
        <div className="post-create">
          <input type="text" value={title} placeholder='Title' onChange={e => setTitle(e.target.value)}/>
          <div className='editor-container'>
            <ReactQuill
              className='editor'
              theme='bubble'
              value={value}
              onChange={setValue}
            />
          </div>
        </div>
        <div className="options">
          <div className="publish">
            <h1>Publish</h1>
            <input style={{display: "none"}} type="file" id="file" onChange={e => setImage(e.target.files[0])}/>
            <label htmlFor="file" className='upload-btn'>Upload file</label>
            <div className='buttons'>
              <button onClick={publish}>Publish</button>
            </div>
          </div>
          <div className="category">
            <h1>Category</h1>
            <div className="radio-input">
              <input type="radio" checked={category === 'art'} name="category" value="art" id='art' onChange={e => setCategory(e.target.value)} />
              <label htmlFor="art">Art</label>
            </div>
            <div className="radio-input">
              <input type="radio" checked={category === 'science'} name="category" value="science" id='science' onChange={e => setCategory(e.target.value)} />
              <label htmlFor="science">Science</label>
            </div>
            <div className="radio-input">
              <input type="radio" checked={category === 'technology'} name="category" value="technology" id='technology' onChange={e => setCategory(e.target.value)} />
              <label htmlFor="technology">Technology</label>
            </div>
            <div className="radio-input">
              <input type="radio" checked={category === 'cinema'} name="category" value="cinema" id='cinema' onChange={e => setCategory(e.target.value)} />
              <label htmlFor="cinema">Cinema</label>
            </div>
            <div className="radio-input">
              <input type="radio" checked={category === 'design'} name="category" value="design" id='design' onChange={e => setCategory(e.target.value)} />
              <label htmlFor="design">Design</label>
            </div>
            <div className="radio-input">
              <input type="radio" checked={category === 'food'} name="category" value="food" id='food' onChange={e => setCategory(e.target.value)} />
              <label htmlFor="food">Food</label>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Write