import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Avatar } from "antd";

const API_URL = process.env.REACT_APP_API_URL;

const PostJustText = () => {
  const { post } = useSelector((state) => state.posts);

  return (
    <div
      className="PostJustText"
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        borderRight: "1px solid gray",
      }}
    >
      <Link to={`/profile/${post.userId._id}`}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "3rem",
          }}
        >
          {post.userId.img ? (
            <Avatar size={200} src={post.userId.img} />
          ) : (
            <Avatar size={200}>{post.userId.username.substring(0, 1)}</Avatar>
          )}
          <h2 style={{ fontSize: "4rem" }}>{post.userId.username}</h2>
        </div>
      </Link>
      <h2 style={{ fontSize: "3.2rem" }}>{post.title}</h2>
      <p style={{ fontSize: "2.5rem" }}>{post.body}</p>
    </div>
  );
};

export default PostJustText;
