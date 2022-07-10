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
  const { posts } = useSelector((state) => state.posts);
  const { user } = useSelector((state) => state.auth);
  const [load, setLoad] = useState(false);
  const [target, setTarget] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loadInfo = async () => {
    if (user._id === id) {
      setTarget(user);
      await dispatch(getPostsByAuthor(id));
      setLoad(true);
    } else {
      setLoad(false);
      await dispatch(getById(id));
      await dispatch(getPostsByAuthor(id));
      setTarget(userDisplayed);
      console.log(target);
      setLoad(true);
    }
  };

  useEffect(() => {
    setTarget(user);
  }, [user]);

  useEffect(() => {
    setLoad(false);
    loadInfo();
  }, [id]);

  if (load) {
    if (!target.username) {
      console.log(target.username);
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
        <ProfilePosts posts={posts} />
      </section>
    );
  } else {
    return <h1>cargando...</h1>;
  }
};

export default Profile;
