import React, { useState } from "react";
import { Segmented, Button, Empty } from "antd";
import { MessageOutlined, HeartOutlined } from "@ant-design/icons";
import CommentsDetail from "./CommentsDetail/CommentsDetail";
import LikesDetail from "./LikesDetail/LikesDetail";
import "./PostInteractions.scss";

const PostInteractions = ({ likes, comments, postId }) => {
  const [show, setShow] = useState("comments");

  return (
    <div className="PostInteractions">
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
