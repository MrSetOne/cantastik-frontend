import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { getPostById } from "../../features/posts/postsSlice";
import { useDispatch, useSelector } from "react-redux";
import { Avatar, Button, Result } from "antd";
import PostWithImage from "./PostWithImage/PostWithImage";
import PostJustText from "./PostJustText/PostJustText";
import PostInteractions from "./PostInteractions/PostInteractions";
import EditPostDetail from "./EditPostDetail/EditPostDetail";
import FollowBtn from "../Sys/FollowBtn/FollowBtn";

const Profile = () => {
  const { id } = useParams();

  const { post } = useSelector((state) => state.posts);
  const { user } = useSelector((state) => state.auth);

  const [load, setLoad] = useState(false);
  const [edit, setEdit] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loadInfo = async () => {
    setLoad(false);
    await dispatch(getPostById(id));
    await setLoad(true);
  };

  useEffect(() => {
    loadInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  if (load) {
    if (!post._id) {
      setTimeout(() => {
        navigate("/");
      }, 10000);
      return (
        <Result
          status="404"
          title="404"
          subTitle={
            <>
              <p>
                Lo sentimos, el post que trata de visitar no existe :( <br></br>{" "}
                Te devolveremos al home en 10 segundos{" "}
              </p>
            </>
          }
          extra={
            <Button type="primary" onClick={() => navigate("/")}>
              Home
            </Button>
          }
        />
      );
    }
    return (
      <section
        style={{
          minHeight: "calc(100vh - 7rem)",
        }}
      >
        <div className="Profile" style={{ width: "min( 95vw, 150rem )" }}>
          <div
            style={{
              display: "flex",
              borderBottom: "1px solid gray",
              paddingBottom: "1rem",
            }}
          >
            <Link
              to={`/profile/${post.userId._id}`}
              style={{ display: "flex", flex: 1, gap: "1rem" }}
            >
              {post.userId.img ? (
                <Avatar src={post.userId.img} />
              ) : (
                <Avatar>{post.userId.username.substring(0, 1)}</Avatar>
              )}
              <h2>{post.userId.username}</h2>
            </Link>
            {post.userId._id === user._id ? (
              <Button
                type="primary"
                size="small"
                onClick={() => setEdit(!edit)}
              >
                {edit ? "Volver" : "Editar"}
              </Button>
            ) : (
              <FollowBtn dest={post.userId._id} />
            )}
          </div>
          <div style={{ display: "flex", gap: "2rem" }}>
            {edit ? (
              <EditPostDetail
                title={post.title}
                body={post.body}
                _id={post._id}
                setEdit={setEdit}
              />
            ) : post.img ? (
              <PostWithImage />
            ) : (
              <PostJustText />
            )}
            {edit ? null : (
              <PostInteractions
                likes={post.likes}
                comments={post.comments}
                postId={post._id}
              />
            )}
          </div>
        </div>
      </section>
    );
  } else {
    return <h1>cargando...</h1>;
  }
};

export default Profile;
