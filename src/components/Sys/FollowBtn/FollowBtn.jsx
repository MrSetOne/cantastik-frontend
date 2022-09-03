import { useDispatch, useSelector } from "react-redux";
import { doAFollow, doAnUnfollow } from "../../../features/auth/authSlice";
import { Button } from "antd";

const FollowBtn = ({ dest }) => {
  const { user, loads } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const isFollowing = user.following.some((objetive) => objetive._id === dest);

  return user._id === dest ? null : (
    <Button
      size="small"
      type={isFollowing ? "default" : "primary"}
      className="FollowBtn"
      loading={loads.follow}
      onClick={
        isFollowing
          ? () => dispatch(doAnUnfollow(dest))
          : () => dispatch(doAFollow(dest))
      }
    >
      {isFollowing ? "Dejar de seguir" : "Seguir"}
    </Button>
  );
};

export default FollowBtn;
