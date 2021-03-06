import React from "react";

const Post = ({ post: { caption, location, photo } }) => {
  return (
    <div>
      <img
        src={photo}
        alt={caption}
        style={{ width: "150px", height: "150px" }}
      />
      <h1>{caption}</h1>
      <h4>{location}</h4>
    </div>
  );
};

export default Post;
