import React, { useState } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'

const Write = () => {
  const [value, setValue] = useState('');
  const [post, setPost] = useState({
    title: "",
    desc: "",
  })

  const handleChange = (e) => {
    console.log(e.target.value)
    // setPost(prev => ({...prev, title: e.target.value, desc: e.target.value}))
  }

  return (
    <div className="add">
      <div className="content">
        <div className="post-create">
          <input type="text" placeholder='Title'/>
          <div className='editor-container'>
            <ReactQuill className='editor' theme='snow' onChange={handleChange}/>
          </div>
        </div>
        <div className="options">
          <div className="publish">
            <h1>Publish</h1>
            <p><span>Status: </span>Draft</p>
            <p><span>Visibility: </span>Public</p>
            <input style={{display: "none"}} type="file" id="file" />
            <label htmlFor="file">Upload file</label>
            <div className='buttons'>
              <button>Save as draft</button>
              <button>Update</button>
            </div>
          </div>
          <div className="category">
            <h1>Category</h1>
            <div className="radio-input">
              <input type="radio" name="category" value="art" id='art' />
              <label htmlFor="art">Art</label>
            </div>
            <div className="radio-input">
              <input type="radio" name="category" value="art" id='science' />
              <label htmlFor="science">Science</label>
            </div>
            <div className="radio-input">
              <input type="radio" name="category" value="art" id='technology' />
              <label htmlFor="technology">Technology</label>
            </div>
            <div className="radio-input">
              <input type="radio" name="category" value="art" id='cinema' />
              <label htmlFor="cinema">Cinema</label>
            </div>
            <div className="radio-input">
              <input type="radio" name="category" value="art" id='design' />
              <label htmlFor="design">Design</label>
            </div>
            <div className="radio-input">
              <input type="radio" name="category" value="food" id='food' />
              <label htmlFor="food">Food</label>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Write