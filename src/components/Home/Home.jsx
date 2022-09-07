import React, { useEffect } from "react";
import { getPosts } from "../../features/posts/postsSlice";
import { useDispatch, useSelector } from "react-redux";
import Posts from "./Posts/Posts";
import "./Home.scss";

import { BackTop, Button } from "antd";
import { UpCircleOutlined } from "@ant-design/icons";
import Wellcomer from "./Wellcomer/Wellcomer";
import Spinner from "../Sys/Spinner/Spinner";

const Home = () => {
  const { posts, loads } = useSelector((state) => state.posts);
  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPosts());
  }, []);

  return (
    <div className="home">
      <Spinner visible={loads.home} />
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
