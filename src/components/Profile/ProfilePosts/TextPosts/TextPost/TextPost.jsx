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
  HeartOutlined,
  MessageOutlined,
  DoubleLeftOutlined,
  SendOutlined,
} from "@ant-design/icons";
import { useState } from "react";
import { addComment } from "../../../../../features/posts/postsSlice";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import FollowBtn from "../../../../Sys/FollowBtn/FollowBtn";
import LikeBtn from "../../../../Sys/LikeBtn/LikeBtn";
import "./TextPosts.scss";

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
                <Avatar src={comment.author.img} />
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
              <Avatar src={like.img} />
            ) : (
              <Avatar>{like.username.substring(0, 1)}</Avatar>
            )}
            <h4 style={{ flex: 1 }}>{like.username}</h4>
            {like._id === user._id ? null : <FollowBtn dest={like._id} />}
          </Link>
        </div>
        <Divider style={{ margin: "0" }} />
      </>
    );
  });

  return (
    <motion.article
      className="TextPost"
      whileHover={{
        scale: 1.12,
        boxShadow: "0px 10px 28px 0px rgba(0,0,0,0.31)",
      }}
    >
      <div className="TextPost__body">
        <Link to={`/post/${post._id}`}>
          <div>
            {post.userId.img ? (
              <Avatar size={45} src={post.userId.img} />
            ) : (
              <Avatar>{post.userId.username.substring(0, 1)}</Avatar>
            )}
            <h2>{post.userId.username}</h2>
          </div>
          <h3>{post.title}</h3>
          <p>{post.body}</p>
        </Link>
      </div>
      <div className="TextPost__interactions">
        <div>
          <div className="TextPost__interactions--btns">
            <LikeBtn
              post={post._id}
              iteration={post.i}
              authorPost={true}
              btn={false}
            />
            <Button
              onClick={() => setModal(true)}
              shape={"circle"}
              size={"large"}
              icon={<MessageOutlined />}
              type={"text"}
            />
          </div>
          <div className="TextPost__interactions--info">
            <p onClick={() => setModal(true)}>{post.likes.length} likes</p>
            <p onClick={() => setModal(true)}>
              {post.comments.length} comentarios
            </p>
          </div>
        </div>
      </div>
      <Modal
        className="TextPost__modal"
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
        <div className="TextPost__modal--content">
          <Segmented
            options={[
              { value: "comments", icon: <MessageOutlined /> },
              { value: "likes", icon: <HeartOutlined /> },
            ]}
            value={show}
            onChange={setShow}
          />
          {show === "comments" ? (
            <div className="TextPost__modal--comments">
              <div>{allComments}</div>
              <form onSubmit={(e) => sendComment(e)}>
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
            </div>
          ) : (
            <div className="TextPost__modal--likes">
              <div>{allLikes}</div>
              <LikeBtn post={post._id} iteration={post.i} authorPost={true} />
            </div>
          )}
        </div>
      </Modal>
    </motion.article>
  );
};

export default TextPost;
