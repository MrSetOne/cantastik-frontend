import React, { useEffect, useState } from "react";
import { getPosts } from "../../features/posts/postsSlice";
import { useDispatch, useSelector } from "react-redux";
import Posts from "./Posts/Posts";
import "./Home.scss";
import { BackTop, Button } from "antd";
import { UpCircleOutlined } from "@ant-design/icons";
import Wellcomer from "./Wellcomer/Wellcomer";

const Home = () => {
  const { posts } = useSelector((state) => state.posts);
  const { user } = useSelector((state) => state.auth);
  const [load, setLoad] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    setLoad(false);
    dispatch(getPosts());
  }, []);

  useEffect(() => {
    setLoad(true);
    console.log(load);
  }, [posts]);

  return (
    <div className="home">
      <div
        className="spinner__container"
        style={{ display: !load ? "flex" : "none" }}
      >
        <div className="spinner">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
      {user.firstVisit ? <Wellcomer /> : posts ? <Posts /> : null}
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
