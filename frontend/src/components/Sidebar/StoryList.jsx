import React from "react";
import { Card } from "antd";
import "./StoryList.scss";
const StoryList = props => {
  return (
    <Card title="Stories" size="small" style={{ marginBottom: 10 }}>
      Stories from people you follow will show up here.
    </Card>
  );
};

export default StoryList;
