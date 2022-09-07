import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Avatar } from "antd";
import "./PostJustText.scss";

const PostJustText = () => {
  const { post } = useSelector((state) => state.posts);

  return (
    <div className="PostJustText">
      <Link to={`/profile/${post.userId._id}`}>
        <div className="PostJustText__Link">
          {post.userId.img ? (
            <Avatar size={200} src={post.userId.img} />
          ) : (
            <Avatar size={200}>{post.userId.username.substring(0, 1)}</Avatar>
          )}
          <h2>{post.userId.username}</h2>
        </div>
      </Link>
      <h2>{post.title}</h2>
      <p>{post.body}</p>
    </div>
  );
};

export default PostJustText;
