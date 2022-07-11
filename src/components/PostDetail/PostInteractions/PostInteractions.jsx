import React, { useState } from "react";
import { Segmented, Button, Empty } from "antd";
import { MessageOutlined, HeartOutlined } from "@ant-design/icons";
import CommentsDetail from "./CommentsDetail/CommentsDetail";
import LikesDetail from "./LikesDetail/LikesDetail";

const PostInteractions = ({ likes, comments, postId }) => {
  const [show, setShow] = useState("comments");

  return (
    <div
      className="PostInteractions"
      style={{
        width: "35rem",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "1rem",
      }}
    >
      <Segmented
        options={[
          { value: "comments", icon: <MessageOutlined /> },
          { value: "likes", icon: <HeartOutlined /> },
        ]}
        value={show}
        onChange={setShow}
        style={{ marginTop: "1rem" }}
      />
      {show === "comments" ? (
        <CommentsDetail comments={comments} postId={postId} />
      ) : (
        <LikesDetail likes={likes} postId={postId} />
      )}
    </div>
  );
};

export default PostInteractions;
