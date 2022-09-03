import React, { useState } from "react";
import {
  like,
  unlike,
  addComment,
} from "../../../../features/posts/postsSlice";
import {
  addLike,
  removeLike,
  doAFollow,
  doAnUnfollow,
} from "../../../../features/auth/authSlice";
import { useSelector, useDispatch } from "react-redux";
import {
  HeartOutlined,
  HeartFilled,
  MessageOutlined,
  DoubleLeftOutlined,
  SendOutlined,
} from "@ant-design/icons";
import { Avatar, Modal, Button, Input, Empty, Segmented } from "antd";
import "./Post.scss";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import FollowBtn from "../../../Sys/FollowBtn/FollowBtn";

const API_URL = process.env.REACT_APP_API_URL;

const Post = ({ item }) => {
  const { user } = useSelector((state) => state.auth);
  // const { posts} = useSelector((state)=>state.posts) //Esto lo puedo utilizar mas adelante para indicar que no hay ningun post (Ofrecer seguir a alguien)
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [show, setShow] = useState("comments");
  const [commentValue, setCommentValue] = useState("");

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleClose = () => {
    setIsModalVisible(false);
  };

  const doALike = async () => {
    await dispatch(like({ postId: item._id, i: item.i }));
    await dispatch(addLike(item._id));
  };

  const doAnUnlike = async () => {
    await dispatch(unlike({ postId: item._id, i: item.i }));
    await dispatch(removeLike(item._id));
  };

  const sendComment = async (e) => {
    await e.preventDefault();
    const comment = commentValue;
    await setCommentValue("");
    await dispatch(addComment({ i: item.i, postId: item._id, value: comment }));
    e.target[0].value = "";
  };

  const comments = item.comments.map((element) => {
    return (
      <div key={element._id}>
        <Link to={`/profile/${element.author._id}`}>
          {element.author.img ? (
            <Avatar src={element.author.img} />
          ) : (
            <Avatar>{element.author.username.substring(0, 1)}</Avatar>
          )}
        </Link>

        <p>
          <Link
            style={{ color: "black", fontWeight: 700 }}
            to={`/profile/${element.author._id}`}
          >
            {element.author.username}
          </Link>{" "}
          {element.comment}
        </p>
      </div>
    );
  });

  const likes = item.likes.map((element) => {
    return (
      <div className="Likes__item" style={{ marginBottom: "1rem" }}>
        <div className="Likes__item--info">
          <Link to={`/profile/${element._id}`}>
            {element.img ? (
              <Avatar src={element.img} />
            ) : (
              <Avatar>{element.username.substring(0, 1)}</Avatar>
            )}
          </Link>
          <Link to={`/profile/${element._id}`}>
            <h3>{element.username}</h3>
          </Link>
        </div>
        {/* element._id */}
        <FollowBtn dest={element._id} />
      </div>
    );
  });

  return (
    <motion.article
      className="Post"
      key={item._id}
      style={{ marginBottom: "2rem", overflow: "hidden" }}
      initial={{ y: 100 }}
      whileInView={{ y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      viewport={{ once: true }}
    >
      <div className="Post__Author">
        <Link
          to={`/profile/${item.userId._id}`}
          className="Post__Author--links"
        >
          {item.userId.img ? (
            <Avatar src={item.userId.img} />
          ) : (
            <Avatar>{item.userId.username.substring(0, 1)}</Avatar>
          )}
          <h2>{item.userId.username}</h2>
        </Link>
        {user._id === item.userId._id ? (
          <Button
            type="primary"
            size="small"
            onClick={() => navigate(`/post/${item._id} `)}
          >
            Editar
          </Button>
        ) : (
          <FollowBtn dest={item.userId._id} />
        )}
      </div>
      <Link to={`/post/${item._id}`} style={{ color: "black" }}>
        {item.img ? <img src={item.img} className="Post__Img" /> : null}
        <div className="Post__Text">
          <h3>{item.title}</h3>
          <p>{item.body}</p>
        </div>
      </Link>
      <div className="Post__Interactions">
        <div className="Post__Interactions--Icons">
          {user.likedPosts.includes(item._id) ? (
            <HeartFilled onClick={() => doAnUnlike()} />
          ) : (
            <HeartOutlined onClick={() => doALike()} />
          )}
          <MessageOutlined onClick={() => showModal()} />
        </div>
        <div className="Post__Interactions--Info">
          <p onClick={() => showModal()} style={{ cursor: "pointer" }}>
            {item.likes.length} Me gusta
          </p>
          <p onClick={() => showModal()} style={{ cursor: "pointer" }}>
            {item.comments.length} comentarios
          </p>
        </div>
      </div>
      <Modal
        title="Basic Modal"
        visible={isModalVisible}
        onCancel={() => handleClose()}
        className="Post__Modal"
        style={{ top: 20 }}
        footer={[
          <Button
            key="back"
            onClick={() => handleClose()}
            type="primary"
            icon={<DoubleLeftOutlined />}
          >
            Volver
          </Button>,
        ]}
      >
        <div className="Post__ModalItem">
          <Segmented
            options={[
              { value: "comments", icon: <MessageOutlined /> },
              { value: "likes", icon: <HeartOutlined /> },
            ]}
            value={show}
            onChange={setShow}
          />
          {show === "comments" ? (
            <div className="Post__ModalItem--comments">
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
              <form
                style={{ display: "flex" }}
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
          )}
        </div>
      </Modal>
    </motion.article>
  );
};

export default Post;
