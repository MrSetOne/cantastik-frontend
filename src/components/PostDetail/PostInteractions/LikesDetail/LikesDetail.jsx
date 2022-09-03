import { HeartFilled } from "@ant-design/icons";
import { Avatar, Button, Empty } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { like, unlike } from "../../../../features/posts/postsSlice";
import { Link } from "react-router-dom";
import {
  addLike,
  removeLike,
  doAFollow,
  doAnUnfollow,
} from "../../../../features/auth/authSlice";

const API_URL = process.env.REACT_APP_API_URL;

const LikesDetail = ({ likes, postId }) => {
  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const doALike = async () => {
    await dispatch(like({ postId, user }));
    await dispatch(addLike(postId));
  };

  const doAnUnlike = async () => {
    await dispatch(unlike({ postId, user }));
    await dispatch(removeLike(postId));
  };

  const printLikes = likes.map((like) => {
    return (
      <div
        className="Likes__item"
        style={{
          display: "flex",
          width: "100%",
          alignItems: "center",
          gap: "1rem",
          marginBottom: "1rem",
        }}
      >
        <Link to={`/profile/${like._id}`}>
          {like.img ? (
            <Avatar src={like.img} />
          ) : (
            <Avatar>{like.username.substring(0, 1)}</Avatar>
          )}
        </Link>
        <Link to={`/profile/${like._id}`} style={{ flex: 1 }}>
          <h3>{like.username}</h3>
        </Link>
        {user._id === like._id ? null : user.following.some(
            (objetive) => objetive._id === like._id
          ) ? (
          <Button size="small" onClick={() => dispatch(doAnUnfollow(like._id))}>
            Dejar se seguir
          </Button>
        ) : (
          <Button
            type="primary"
            size="small"
            onClick={() => {
              dispatch(doAFollow(like._id));
            }}
          >
            Seguir
          </Button>
        )}
      </div>
    );
  });

  return (
    <div
      className="LikesDetail"
      style={{
        overflow: "auto",
        height: "calc(100vh - 27rem)",
        marginBottom: "1rem",
        paddingRight: "1rem",
        position: "relative",
        width: "100%",
      }}
    >
      {likes.length !== 0 ? (
        <div className="Likes__Container">{printLikes}</div>
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
      {user.likedPosts.includes(postId) ? (
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
  );
};

export default LikesDetail;
