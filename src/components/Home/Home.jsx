import React, { useEffect } from "react";
import { getPosts } from "../../features/posts/postsSlice";
import { useDispatch, useSelector } from "react-redux";
import Posts from "./Posts/Posts";
import "./Home.scss";
import { BackTop, Button } from "antd";
import { UpCircleOutlined } from "@ant-design/icons";

const Home = () => {
  const { isLoading, posts } = useSelector((state) => state.posts);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPosts());
  }, []);

  return (
    <div className="home">
      <div
        className="spinner__container"
        style={{ display: isLoading ? "flex" : "none" }}
      >
        <div className="spinner">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
      {posts ? <Posts /> : null}
      <BackTop>
        <Button
          type="primary"
          shape="circle"
          icon={<UpCircleOutlined />}
          size={"large"}
        />
      </BackTop>
    </div>
  );
};

export default Home;
