import React, { useEffect, useState } from "react";
import axios from "axios";
import Post from "./Post";
const apiURL = "http://127.0.0.1:8000/api/posts/";

const PostList = () => {
  const [postLists, setPostLists] = useState([]);
  useEffect(() => {
    axios
      .get(apiURL)
      .then(response => {
        const { data } = response;
        setPostLists(data);
      })
      .catch(error => {
        //error.response;
      });
    console.log("mounted");
  }, []);

  return (
    <div>
      <h1>PostList</h1>
      {postLists.map(post => {
        const { id } = post;
        return <Post key={id} post={post} />;
      })}
    </div>
  );
};

export default PostList;
