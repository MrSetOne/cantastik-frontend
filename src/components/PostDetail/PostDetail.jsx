import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getById } from "../../features/users/usersSlice";
import { getPostsByAuthor, getPostById } from "../../features/posts/postsSlice";
import { useDispatch, useSelector } from "react-redux";
import { Button, Result } from "antd";
import PostWithImage from "./PostWithImage/PostWithImage";
import PostJustText from "./PostJustText/PostJustText";
import PostInteractions from "./PostInteractions/PostInteractions";
import EditPostDetail from "./EditPostDetail/EditPostDetail";

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
      <section className="Profile">
        {edit ? (
          <EditPostDetail
            title={post.title}
            body={post.body}
            _id={post._id}
            setEdit={setEdit}
          />
        ) : post.userId._id === user._id ? (
          <Button type="primary" size="small" onClick={() => setEdit(true)}>
            Editar
          </Button>
        ) : (
          <Button type="primary" size="small">
            Follow(NW)
          </Button>
        )}
        {edit ? null : post.img ? <PostWithImage /> : <PostJustText />}
        {edit ? null : (
          <PostInteractions
            likes={post.likes}
            comments={post.comments}
            postId={post._id}
          />
        )}
      </section>
    );
  } else {
    return <h1>cargando...</h1>;
  }
};

export default Profile;
