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

  const { userDisplayed } = useSelector((state) => state.users);
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

  if (load) {
    if (!target.username) {
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
                Lo sentimos, la pagina que trata de visitar no existe :({" "}
                <br></br> Te devolveremos al home en 10 segundos{" "}
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
        <ProfileCard target={target} />
        <ProfilePosts posts={authorPosts} />
      </section>
    );
  } else {
    return <h1>cargando...</h1>;
  }
};

export default Profile;
