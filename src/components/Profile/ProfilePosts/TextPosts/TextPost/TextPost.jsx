import {
  Avatar,
  Modal,
  Button,
  Segmented,
  Comment,
  Divider,
  Input,
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  HeartFilled,
  HeartOutlined,
  MessageOutlined,
  DoubleLeftOutlined,
  SendOutlined,
} from "@ant-design/icons";
import { useState } from "react";
import {
  addComment,
  like,
  unlike,
} from "../../../../../features/posts/postsSlice";
import {
  addLike,
  removeLike,
  doAFollow,
  doAnUnfollow,
} from "../../../../../features/auth/authSlice";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const API_URL = process.env.REACT_APP_API_URL;

const TextPost = ({ post }) => {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);

  const [modal, setModal] = useState(false);
  const [show, setShow] = useState("comments");
  const [commentValue, setCommentValue] = useState("");

  const allComments = post.comments.map((comment) => {
    return (
      <>
        <Comment
          author={comment.author.username}
          avatar={
            comment.author.img ? (
              <Link to={`/profile/${comment.author._id}`}>
                <Avatar src={`${API_URL}/porfile/${comment.author.img}`} />
              </Link>
            ) : (
              <Link to={`/profile/${comment.author._id}`}>
                <Avatar>{comment.author.username.substring(0, 1)}</Avatar>
              </Link>
            )
          }
          content={comment.comment}
          style={{ width: "100%" }}
        />
        <Divider style={{ margin: "0" }} />
      </>
    );
  });

  const sendComment = async (e) => {
    await e.preventDefault();
    const comment = commentValue;
    await setCommentValue("");
    await dispatch(
      addComment({
        i: post.i,
        postId: post._id,
        value: comment,
        authorPost: true,
      })
    );
  };

  const doALike = async () => {
    await dispatch(like({ postId: post._id, i: post.i, authorPost: true }));
    await dispatch(addLike(post._id));
  };

  const doAnUnlike = async () => {
    await dispatch(unlike({ postId: post._id, i: post.i, authorPost: true }));
    await dispatch(removeLike(post._id));
  };

  const allLikes = post.likes.map((like) => {
    return (
      <>
        <div style={{ display: "flex", margin: "1rem 0" }}>
          <Link
            to={`/profile/${like._id}`}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "1rem",
              width: "100%",
            }}
          >
            {like.img ? (
              <Avatar src={`${API_URL}/porfile/${like.img}`} />
            ) : (
              <Avatar>{like.username.substring(0, 1)}</Avatar>
            )}
            <h4 style={{ flex: 1 }}>{like.username}</h4>
            {like._id === user._id ? null : user.following.some(
                (objetive) => objetive._id === like._id
              ) ? (
              <Button
                style={{ width: "min-content" }}
                size="small"
                onClick={() => dispatch(doAnUnfollow(like._id))}
              >
                Dejar se seguir
              </Button>
            ) : (
              <Button
                style={{ width: "min-content" }}
                type="primary"
                size="small"
                onClick={() => {
                  dispatch(doAFollow(like._id));
                }}
              >
                Seguir
              </Button>
            )}
          </Link>
        </div>
        <Divider style={{ margin: "0" }} />
      </>
    );
  });

  return (
    <motion.article
      whileHover={{
        scale: 1.12,
        boxShadow: "0px 10px 28px 0px rgba(0,0,0,0.31)",
      }}
      className="TextPost"
      style={{
        borderTop: "1px solid gray",
        borderBottom: "1px solid gray",
        width: "100%",
        padding: "2rem",
        backgroundColor: "white",
      }}
    >
      <div>
        <Link to={`/post/${post._id}`}>
          <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
            {post.userId.img ? (
              <Avatar size={45} src={`${API_URL}/porfile/${post.userId.img}`} />
            ) : (
              <Avatar>{post.userId.username.substring(0, 1)}</Avatar>
            )}
            <h2 style={{ fontSize: "3rem" }}>{post.userId.username}</h2>
          </div>
          <h3 style={{ fontSize: "2rem" }}>{post.title}</h3>
          <p style={{ color: "black" }}>{post.body}</p>
        </Link>
      </div>
      <div style={{ display: "flex" }}>
        <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
          {user.likedPosts.includes(post._id) ? (
            <HeartFilled
              style={{ fontSize: "1.5rem", margin: 0 }}
              onClick={() => doAnUnlike()}
            />
          ) : (
            <HeartOutlined
              style={{ fontSize: "1.5rem", margin: 0 }}
              onClick={() => doALike()}
            />
          )}
          <MessageOutlined
            style={{ fontSize: "1.5rem", margin: 0 }}
            onClick={() => setModal(true)}
          />
          <p
            style={{ fontSize: "1.5rem", margin: 0, cursor: "pointer" }}
            onClick={() => setModal(true)}
          >
            {post.likes.length} likes
          </p>
          <p
            style={{ fontSize: "1.5rem", margin: 0, cursor: "pointer" }}
            onClick={() => setModal(true)}
          >
            {post.comments.length} comentarios
          </p>
        </div>
      </div>
      <Modal
        visible={modal}
        title={post.userId.username}
        onCancel={() => setModal(false)}
        footer={[
          <Button
            key="back"
            onClick={() => setModal(false)}
            type="primary"
            icon={<DoubleLeftOutlined />}
          >
            Volver
          </Button>,
        ]}
      >
        <div
          style={{
            padding: "10px",
            position: "relative",
            height: "100%",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Segmented
            options={[
              { value: "comments", icon: <MessageOutlined /> },
              { value: "likes", icon: <HeartOutlined /> },
            ]}
            value={show}
            onChange={setShow}
          />
          {show === "comments" ? (
            <>
              <div
                style={{
                  maxHeight: "500px",
                  overflow: "auto",
                  marginBottom: "30px",
                  width: "100%",
                }}
              >
                {allComments}
              </div>
              <form
                style={{
                  display: "flex",
                  position: "absolute",
                  width: "100%",
                  bottom: 0,
                }}
                onSubmit={(e) => sendComment(e)}
              >
                <Input
                  style={{ flex: 1 }}
                  placeholder="Escribe tu comentario"
                  bordered={false}
                  name="comment"
                  value={commentValue}
                  onChange={(e) => setCommentValue(e.target.value)}
                  prefix={<MessageOutlined />}
                />
                <Button
                  type="primary"
                  icon={<SendOutlined />}
                  htmlType="submit"
                />
              </form>
            </>
          ) : (
            <>
              <div
                style={{
                  maxHeight: "500px",
                  overflow: "auto",
                  marginBottom: "30px",
                  width: "100%",
                }}
              >
                {allLikes}
              </div>
              {user.likedPosts.includes(post._id) ? (
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
            </>
          )}
        </div>
      </Modal>
    </motion.article>
  );
};

export default TextPost;
