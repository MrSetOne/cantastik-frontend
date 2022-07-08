import { HeartFilled } from "@ant-design/icons";
import { Avatar, Button, Empty } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { like, unlike } from "../../../../features/posts/postsSlice";
import { addLike, removeLike } from "../../../../features/auth/authSlice";
import { Link } from "react-router-dom";

const LikesDetail = ({ likes, postId }) => {
  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const doALike = async () => {
    await dispatch(like({ postId }));
    await dispatch(addLike(postId));
  };

  const doAnUnlike = async () => {
    await dispatch(unlike({ postId }));
    await dispatch(removeLike(postId));
  };

  const printLikes = likes.map((like) => {
    return (
      <div className="Likes__item">
        <div className="Likes__item--info">
          <Link to={`/profile/${like._id}`}>
            {like.img ? (
              <Avatar src={`http://localhost:8080/porfile/${like.img}`} />
            ) : (
              <Avatar>{like.username.substring(0, 1)}</Avatar>
            )}
          </Link>
          <Link to={`/profile/${like._id}`}>
            <h3>{like.username}</h3>
          </Link>
        </div>
        <Button key="back" type="primary" size="small">
          Follow(NotWorking)
        </Button>
      </div>
    );
  });

  return (
    <div className="LikesDetail">
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
