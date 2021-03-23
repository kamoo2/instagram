import { Button } from "antd";
import AppLayout from "components/AppLayout";
import PostList from "components/PostList";
import StoryList from "components/Sidebar/StoryList";
import SuggestionList from "components/Sidebar/SuggestionList";
import React from "react";

const Home = ({ history }) => {
  const handleClick = () => {
    history.push("/posts/new");
  };
  const sidebar = (
    <>
      <Button
        type="primary"
        block
        style={{ marginBottom: "1rem" }}
        onClick={handleClick}
      >
        새 포스팅 쓰기
      </Button>
      <StoryList />
      <SuggestionList />
    </>
  );
  return (
    <AppLayout sidebar={sidebar}>
      <PostList />
    </AppLayout>
  );
};

export default Home;
