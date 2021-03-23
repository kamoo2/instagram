import React from "react";
import moment from "moment";
import { Avatar, Comment, Tooltip } from "antd";

const CommentItem = ({ comment }) => {
  const {
    author: { username, name, avatar_url },
    message,
    created_at,
  } = comment;
  return (
    <Comment
      author={name.length === 0 ? username : name}
      avatar={<Avatar src={avatar_url} alt={`${username}의 프로필 사진`} />}
      content={<p>{message}</p>}
      datetime={
        <Tooltip title={moment().format(created_at)}>
          <span>{moment(created_at).fromNow()}</span>
        </Tooltip>
      }
    />
  );
};

export default CommentItem;
