import React from "react";
import { Card, Avatar } from "antd";
import { HeartOutlined, HeartTwoTone } from "@ant-design/icons";
import CommentList from "./CommentList";

const Post = ({
  post,
  post: { caption, location, photo, author, tag_set, is_like },
  handleLike,
}) => {
  const { username, name, avatar_url } = author;

  return (
    <div style={{ marginBottom: 20 }}>
      <Card
        hoverable="true"
        size="small"
        cover={<img src={photo} alt={caption} height={400} />}
        actions={[
          is_like ? (
            <HeartTwoTone
              twoToneColor="#eb2f96"
              onClick={() => handleLike({ post, isLike: false })}
            />
          ) : (
            <HeartOutlined onClick={() => handleLike({ post, isLike: true })} />
          ),
        ]}
      >
        <Card.Meta
          avatar={
            <Avatar
              size="large"
              icon={<img src={avatar_url} alt={username} />}
            />
          }
          title={location}
          description={caption}
          style={{ marginBottom: "0.5rem" }}
        />

        <CommentList post={post} />
      </Card>
    </div>
  );
};

export default Post;
