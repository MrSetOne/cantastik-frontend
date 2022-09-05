import React from "react";
import { useSelector } from "react-redux";

const PostWithImage = () => {
  const { post } = useSelector((state) => state.posts);

  console.log(post);
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
        src={post.img}
        alt={`Imagen de ${post.userId.username}`}
        className="Post__Img"
        style={{ width: "100%", aspectRatio: 1.6 / 1, objectFit: "cover" }}
      />
      <h2 style={{ fontSize: "3.5rem" }}>{post.title}</h2>
      <p style={{ fontSize: "2rem" }}>{post.body}</p>
    </div>
  );
};

export default PostWithImage;
