import React, { useState } from "react";
import { Segmented, Button, Empty } from "antd";
import { MessageOutlined, HeartOutlined } from "@ant-design/icons";
import CommentsDetail from "./CommentsDetail/CommentsDetail";
import LikesDetail from "./LikesDetail/LikesDetail";

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
      />
      {show === "comments" ? (
        <CommentsDetail comments={comments} postId={postId} />
      ) : (
        <LikesDetail likes={likes} postId={postId} />
      )}
      {/* <div className="Post__ModalItem--comments">
           {item.comments.length !== 0 ? (
            <div className="Comments__Container">{comments}</div>
          ) : (
            <Empty
              description={
                <span>
                  Nadie ha comentado aun en este post,
                  <br />
                  <b>¡Se el primero en hacerlo!</b>
                </span>
              }
            />
          )}
          <form style={{ display: "flex" }} onSubmit={(e) => sendComment(e)}>
            <Input
              placeholder="Escribe tu comentario"
              bordered={false}
              name="comment"
              value={commentValue}
              onChange={(e) => setCommentValue(e.target.value)}
              prefix={<MessageOutlined />}
            />
            <Button type="primary" icon={<SendOutlined />} htmlType="submit" />
          </form>
        </div>
      ) : (
        <div className="Post__ModalItem--likes">
          {item.likes.length !== 0 ? (
            <div className="Likes__Container">{likes}</div>
          ) : (
            <Empty
              description={
                <span>
                  Nadie ha dado me gusta aun en este post, <br></br>{" "}
                  <b>¡Se el primero en hacerlo!</b>
                </span>
              }
            />
          )}
          {user.likedPosts.includes(item._id) ? (
            <Button
              style={{ position: "absolute", bottom: 0, right: 0 }}
              type="primary"
              icon={<HeartFilled />}
              onClick={() => doAnUnlike()}
            >
              Quitar like
            </Button>
          ) : (
            <Button
              style={{ position: "absolute", bottom: 0, right: 0 }}
              type="primary"
              icon={<HeartFilled />}
              onClick={() => doALike()}
            >
              Dar Like
            </Button>
          )}
        </div>
      )} */}
    </div>
  );
};

export default PostInteractions;
