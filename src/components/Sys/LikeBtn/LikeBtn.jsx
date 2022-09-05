import { Button } from "antd";
import { HeartFilled, HeartOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { like, unlike } from "../../../features/posts/postsSlice";
import { addLike, removeLike } from "../../../features/auth/authSlice";

const LikeBtn = ({ btn = true, post, iteration, authorPost = false }) => {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);

  const isLiked = user.likedPosts.includes(post);

  const action = () => {
    if (isLiked) {
      dispatch(
        unlike({
          user,
          authorPost,
          postId: post,
          i: iteration,
        })
      );
      dispatch(removeLike(post));
    } else {
      dispatch(
        like({
          user,
          authorPost,
          postId: post,
          i: iteration,
        })
      );
      dispatch(addLike(post));
    }
  };

  return (
    <Button
      className="LikeBtn"
      type={btn ? "primary" : "text"}
      icon={
        btn ? <HeartFilled /> : isLiked ? <HeartFilled /> : <HeartOutlined />
      }
      onClick={() => action()}
      size={!btn ? "large" : "default"}
      shape={!btn ? "circle" : "default"}
    >
      {btn ? (isLiked ? "Quitar like" : "Dar Like") : null}
    </Button>
  );
};

export default LikeBtn;
