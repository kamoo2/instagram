import React, { useState } from "react";
import { useAppContext } from "store";
// import useAxios from "axios-hooks";
// import axios from "axios";
import CommentItem from "./CommentItem";
import { Input, Button } from "antd";
import { useAxios, axiosInstance } from "api";

const CommentList = ({ post }) => {
  const {
    store: { jwtToken },
  } = useAppContext();

  const [commentValue, setCommentValue] = useState("");
  console.log(commentValue);
  const headers = { Authorization: `JWT ${jwtToken}` };

  const [{ data: commentList, loading, error }, refetch] = useAxios({
    url: `/api/posts/${post.id}/comments/`,
    headers,
  });

  const handleChange = e => {
    const changeText = e.target.value;
    setCommentValue(changeText);
  };

  const handleCommentSave = async () => {
    try {
      await axiosInstance.post(
        `/api/posts/${post.id}/comments/`,
        { message: commentValue },
        { headers }
      );
      setCommentValue("");
      refetch();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {commentList &&
        commentList.map(comment => {
          return <CommentItem key={comment.id} comment={comment} />;
        })}
      <Input.TextArea
        style={{ marginBottom: ".5em" }}
        value={commentValue}
        onChange={handleChange}
      />
      <Button
        block
        type="primary"
        disabled={commentValue.length === 0}
        onClick={handleCommentSave}
      >
        댓글 쓰기
      </Button>
    </div>
  );
};

export default CommentList;
