import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Avatar } from "antd";

const PostWithImage = () => {
  const { post } = useSelector((state) => state.posts);

  return (
    <div
      className="PostWithImage"
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <img
        src={`http://localhost:8080/postsImgs/${post.img}`}
        className="Post__Img"
        style={{ width: "100%" }}
      />
      <h2 style={{ fontSize: "3.5rem" }}>{post.title}</h2>
      <p style={{ fontSize: "2rem" }}>{post.body}</p>
    </div>
  );
};

export default PostWithImage;
