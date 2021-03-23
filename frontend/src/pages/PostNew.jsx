import { Card } from "antd";
import PostNewForm from "components/PostNewForm";
import React from "react";
import "./PostNew.scss";

const PostNew = props => {
  return (
    <div className="PostNew">
      <Card title="새 포스팅 쓰기">
        <PostNewForm />
      </Card>
    </div>
  );
};

export default PostNew;
