import { Avatar, Empty } from "antd";
import FollowBtn from "../../../Sys/FollowBtn/FollowBtn";
import { Link } from "react-router-dom";
import LikeBtn from "../../../Sys/LikeBtn/LikeBtn";
import "./LikesDetail.scss";

const LikesDetail = ({ likes, postId }) => {
  const printLikes = likes.map((like) => {
    return (
      <div className="Likes__item">
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
        <FollowBtn dest={like._id} />
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
      <LikeBtn post={postId} />
    </div>
  );
};

export default LikesDetail;
