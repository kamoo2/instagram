import React from "react";
import Footer from "./Footer/Footer";
import Header from "./Header/Header";
import "./AppLayout.scss";
import StoryList from "./Sidebar/StoryList";
import SuggestionList from "./Sidebar/SuggestionList";

const AppLayout = ({ children, sidebar }) => {
  return (
    <div className="app">
      <Header />
      <div className="contents">{children}</div>
      <div className="sidebar">{sidebar}</div>
      <Footer />
    </div>
  );
};

export default AppLayout;
