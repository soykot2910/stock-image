import React, { useState } from "react";

const Photo = ({
  urls: { regular },
  alt_description,
  likes,
  user: {
    name,
    portfolio_url,
    profile_image: { medium },
  },
}) => {
  const [tlike, setTlike] = useState(likes);
  const handleLike = () => {
    tlike > likes ? setTlike(likes) : setTlike(likes + 1);
  };

  return (
    <div className="img-container">
      <img className="img" src={regular} alt="" />
      <div className="img-info">
        <div style={{ display: "flex" }}>
          <a href={portfolio_url}>
            <img src={medium} alt="" className="user-img" />
          </a>
          <div style={{ marginLeft: "10px", marginTop: "-20px" }}>
            <h4>{name}</h4>
            <p style={{ marginTop: "-15px" }}>{tlike} likes</p>
          </div>
        </div>
        <div>
          <button onClick={handleLike}>
            <i
              className={
                tlike > likes
                  ? "fas fa-heart like-icon color"
                  : "fas fa-heart like-icon"
              }
            ></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Photo;
