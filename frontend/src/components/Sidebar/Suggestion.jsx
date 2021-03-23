import React from "react";
import { Button } from "antd";
import "./Suggestion.scss";
import Avatar from "antd/lib/avatar/avatar";
const Suggestion = ({ user, toggleFollowUser }) => {
  const { name, username, avatar_url, is_follow } = user;
  return (
    <div className="suggestion">
      <div className="avatar">
        <Avatar
          size="small"
          icon={<img src={avatar_url} alt={`${username}'s avatar`} />}
        />
      </div>
      <div className="username">{name.length === 0 ? username : name}</div>
      <div className="action">
        {is_follow && (
          <Button size="small" onClick={() => toggleFollowUser(username)}>
            UnFollow
          </Button>
        )}
        {!is_follow && (
          <Button size="small" onClick={() => toggleFollowUser(username)}>
            Follow
          </Button>
        )}
      </div>
    </div>
  );
};

export default Suggestion;
