import React, {useState} from "react";
import { useForm } from 'react-hook-form';
import calculateReadTime from "../helper/calculateReadTime.js";
import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom';
import {createPost} from "../api/endpointsFakeBlog.js";

Modal.setAppElement('#root');
function NewPost() {
  const { register, handleSubmit, formState: { errors } } = useForm();
    const [showPopup, setShowPopup] = useState(false);
    const [postId, setPostId] = useState(0);
    const [charCount, setCharCount] = useState(0);
    const [response, setResponse] = useState(0);
    const navigate = useNavigate();

  const onSubmit = async data => {
      const readTime = calculateReadTime(data.content);
      let date = new Date();
      date.setHours(date.getHours() + 1);
      const created = date.toISOString();
      const newData = {...data, created, readTime, comments: 0, shares: 0};

      console.log('New data:', newData);

    try {
        const response = await createPost(newData);
        console.log('Response:', response);
        console.log('Response status:', response.status);

        if (response.status < 200 || response.status >= 300)  {
            throw new Error('Failed to post new blog post');
        }

        const postId = response.id;
        setPostId(postId);
        console.log('Post ID:', postId);
        setResponse(response);

        setShowPopup(true);


    } catch (error) {
        console.error('Error:', error);
    }
};


    const handleTextChange = (event) => {
        setCharCount(event.target.value.length);
    };

  return (

      <>
      <div className="form-container">
          <form className="form" onSubmit={handleSubmit(onSubmit)}>

              <label>
                  Blog Post Title
                  <input {...register('title', {required: 'Title is required'})} />
                  {errors.title && <p className="error-field">{errors.title.message}</p>}
              </label>

              <label>
                  Subtitle
                  <input {...register('subtitle', {required: 'Subtitle is required'})} />
                  {errors.subtitle && <p className="error-field">{errors.subtitle.message}</p>}
              </label>

              <label>
                  Author name
                  <input {...register('author-name', {required: 'Name is required'})} />
                  {errors['author-name'] && <p className="error-field">{errors['author-name'].message}</p>}
              </label>


              <label>
                  Content
                  <textarea {...register('content', {
                      required: 'Content is required',
                      minLength: {value: 300, message: 'Content must be at least 300 characters'},
                      maxLength: {value: 2000, message: 'Content must be less than 2000 characters'}
                  })} onChange={handleTextChange}/>
                  {errors.content && <p className="error-field">{errors.content.message}</p>}
              </label>
              <p>{charCount} characters</p>
              <button type="submit">Submit</button>

          </form>
      </div>
      <Modal isOpen={showPopup} onRequestClose={() => setShowPopup(false)}>
          <pre>{JSON.stringify(response, null, 2)}</pre>

          <h2>Post saved! </h2>
          <p>Please note that you will be redirected to your newly added post after clicking the close button</p>
          <button onClick={() => {
              setShowPopup(false);
              navigate(`/post/${postId}`);
          }}>Close</button>


      </Modal>
</>
)
    ;
}


export default NewPost;
