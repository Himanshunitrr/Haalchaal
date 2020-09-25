import React, { useState, useEffect } from "react";
import {useHistory} from "react-router-dom"
import "./createPost.css";
import { GoCloudUpload } from "react-icons/go";

const CreatePost = () => {
  const history = useHistory()
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [image, setImage] = useState("");
  const [url, setUrl] = useState("");

  useEffect(() => {
    if (url) {
      fetch("/createpost", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
        body: JSON.stringify({
          title,
          body: message,
          url,
        }),
      })
        .then((data) => {
          if (data.error) {
          } else {
            history.push("/");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [url])

  const postDetails = () => {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "bakar-mern");
    data.append("cloud_name", "bakar");
    fetch("https://api.cloudinary.com/v1_1/bakar/image/upload", {
      method: "post",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        setUrl(data.secure_url)
      })
      .catch((error) => {
        console.log(error);
      });
    
    
    
    
  };

  return (
    <div className="create-post">
      <div className="create-post-form">
        <div className="title-wrapper">
          <label htmlFor="crete-post-title">Title</label>
          <input
            type="text"
            name=""
            value={title}
            id="create-post-title"
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="message-wrapper">
          <label htmlFor="">Messaage</label>
          <input
            type="text"
            name=""
            id="create-post-message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>
        <div className="upload-submit-wrapper">
          <label htmlFor="select-image" className="image-upload">
            <GoCloudUpload className="upload-icon" />
            <input
              type="file"
              name=""
              id="select-image"
              onChange={(e) => setImage(e.target.files[0])}
            />
            Select Image
          </label>
          <button onClick={postDetails}>Submit Post</button>
        </div>
      </div>
    </div>
  );
};
export default CreatePost;
