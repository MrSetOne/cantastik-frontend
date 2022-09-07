import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getById } from "../../features/users/usersSlice";
import { getPosts, getPostsByAuthor } from "../../features/posts/postsSlice";
import { useDispatch, useSelector } from "react-redux";
import ProfileCard from "./ProfileCard/ProfileCard";
import ProfilePosts from "./ProfilePosts/ProfilePosts";
import { Button, Result } from "antd";
import "./Profile.scss";

const Profile = () => {
  const { id } = useParams();

  const { userDisplayed, isLoading } = useSelector((state) => state.users);
  const { authorPosts } = useSelector((state) => state.posts);
  const [load, setLoad] = useState(false);
  const [target, setTarget] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loadInfo = async () => {
    setLoad(false);
    await dispatch(getById(id));
    await dispatch(getPostsByAuthor(id));
    setLoad(true);
  };

  useEffect(() => {
    setTarget(userDisplayed);
  }, [userDisplayed]);

  useEffect(() => {
    setLoad(false);
    loadInfo();
  }, [id]);

  return isLoading ? (
    <h1>cargando...</h1>
  ) : !target.username ? (
    <Result
      status="404"
      title="404"
      subTitle={
        <>
          <p>
            Lo sentimos, la pagina que trata de visitar no existe :( <br></br>
            Puedes volver al inicio haciendo click aquí bajo.
          </p>
        </>
      }
      extra={
        <Button type="primary" onClick={() => navigate("/")}>
          Inicio
        </Button>
      }
    />
  ) : (
    <section style={{ minHeight: "calc(100vh - 5rem - 2rem - 2.2rem )" }}>
      <div className="Profile">
        <ProfileCard target={target} />
        <ProfilePosts posts={authorPosts} />
      </div>
    </section>
  );
};

export default Profile;
