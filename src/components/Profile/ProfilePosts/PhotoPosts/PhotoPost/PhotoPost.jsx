import { useState } from "react";
import {
  HeartOutlined,
  HeartFilled,
  MessageOutlined,
  SendOutlined,
} from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import {
  Modal,
  Segmented,
  Comment,
  Avatar,
  Divider,
  Input,
  Button,
  Empty,
} from "antd";
import { addComment } from "../../../../../features/posts/postsSlice";
import "./PhotoPost.scss";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import FollowBtn from "../../../../Sys/FollowBtn/FollowBtn";
import LikeBtn from "../../../../Sys/LikeBtn/LikeBtn";

const PhotoPost = ({ post }) => {
  console.log(post);

  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isModalVisibleUser, setIsModalVisibleUser] = useState(false);
  const [commentValue, setCommentValue] = useState("");

  const showModal = () => {
    setIsModalVisibleUser(true);
  };

  const handleOk = () => {
    setIsModalVisibleUser(false);
  };

  const handleCancel = () => {
    setIsModalVisibleUser(false);
  };

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

  const [value, setValue] = useState("comments");

  const allComments = post.comments.map((comment) => {
    return (
      <>
        <Comment
          className="ImagePostComments"
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

  const allLikes = post.likes.map((like) => {
    return (
      <>
        <div
          style={{
            display: "flex",
            margin: "1rem 0",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Link
            to={`/profile/${like._id}`}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "1rem",
            }}
          >
            {like.img ? (
              <Avatar src={like.img} />
            ) : (
              <Avatar>{like.username.substring(0, 1)}</Avatar>
            )}
            <h4 style={{ flex: 1 }}>{like.username}</h4>
          </Link>
          {like._id === user._id ? null : <FollowBtn dest={like._id} />}
        </div>
        <Divider style={{ margin: "0" }} />
      </>
    );
  });

  return (
    <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
      <div
        // onClick={() => showModal()}
        onClick={() => navigate(`/post/${post._id}`)}
        className="PhotoPost"
        key={post._id}
        style={{
          backgroundImage: `url("${post.img}")`,
        }}
      >
        <div className="PhotoPost__info">
          <div>
            {user.likedPosts.includes(post._id) ? (
              <HeartFilled style={{ color: "white" }} />
            ) : (
              <HeartOutlined style={{ color: "white" }} />
            )}
            <p style={{ color: "white" }}>{post.likes.length}</p>
          </div>
          <div>
            <MessageOutlined style={{ color: "white" }} />
            <p style={{ color: "white" }}>{post.comments.length}</p>
          </div>
        </div>
      </div>
      <Modal
        style={{ minHeight: "90vh", top: "5vh" }}
        width={"min(95vw,1300px)"}
        title={
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            {post.userId.img ? (
              <Avatar src={post.userId.img} />
            ) : (
              <Avatar>{post.userId.username.substring(0, 1)}</Avatar>
            )}
            <h2 style={{ marginBottom: 0, flex: 1 }}>{post.userId.username}</h2>
            {user._id === post.userId._id ? (
              <Button
                type="primary"
                onClick={() => navigate(`/post/${post._id}`)}
                style={{ width: "min-content", marginRight: "4rem" }}
              >
                Editar
              </Button>
            ) : (
              <FollowBtn dest={post.userId._id} />
            )}
          </div>
        }
        visible={isModalVisibleUser}
        onOk={() => handleOk()}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Volver
          </Button>,
        ]}
      >
        <div className="ModalPost__Container">
          <div className="ModalPost__Content" style={{ flex: 1 }}>
            <Link to={`/post/${post._id}`}>
              <img src={post.img} alt={post.title} />
            </Link>
            <h2>{post.title}</h2>
            <p>{post.body}</p>
          </div>
          <div className="ModalPost__Interactions">
            <Segmented
              options={[
                { value: "comments", icon: <MessageOutlined /> },
                { value: "likes", icon: <HeartOutlined /> },
              ]}
              value={value}
              onChange={setValue}
            />
            <div
              style={{
                padding: "10px",
                position: "relative",
                height: "100%",
                width: "100%",
              }}
            >
              <div className="ModalPost__Interactions--Comments">
                {value === "comments" ? (
                  post.comments.length !== 0 ? (
                    allComments
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
                  )
                ) : post.likes.length !== 0 ? (
                  allLikes
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
              </div>
              {value === "comments" ? (
                <form
                  style={{
                    display: "flex",
                    position: "absolute",
                    width: "100%",
                    bottom: "1.6rem",
                  }}
                  onSubmit={(e) => sendComment(e)}
                >
                  <Input
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
              ) : (
                <LikeBtn post={post._id} iteration={post.i} authorPost={true} />
              )}
            </div>
          </div>
        </div>
      </Modal>
    </motion.div>
  );
};

export default PhotoPost;
