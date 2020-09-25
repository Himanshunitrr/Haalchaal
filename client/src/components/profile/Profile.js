import React, { useEffect, useState, useContext } from "react";
import {UserContext} from "../../App"
import ProfileImage from "./Profile.jpg";
import "./profile.css";


const Profile = () => {
  const [myPics, setMyPics] = useState([])
  const {state, dispatch} = useContext(UserContext)
  useEffect(() => {
    fetch('/mypost', {
      headers: {
        "Authorization": "Bearer " + localStorage.getItem("jwt")
      }
    }).then(res => res.json())
      .then(result => {
        setMyPics(result.mypost)
      })
  }, [])

  return (
    <div>
      <div className="information">
        <div className="profile-img-container">
          <img src={ProfileImage} alt="profile-image" className="profile-img" />
        </div>
        <div className="profile-name">
          <h1>{state ? state.name: "loading"}</h1>
        </div>
        <div className="profile-bakar-info">
          <div className="followers">
            <p>1M followers</p>
          </div>
          <div className="following">
            <p>0 following</p>
          </div>
          <div className="number-of-posts">
            <p>{myPics.length} posts</p>
          </div>
        </div>
        <div className="flag-line"></div>
      </div>
      <div className="posts">
        {
          myPics.map(item => {
            return (
              <img src={item.photo} alt="profile-image" className="post" key={item._id} />
            )
          })
        }
      </div>
    </div>
  );
};
export default Profile;
