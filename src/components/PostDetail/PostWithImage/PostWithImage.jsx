import { useSelector } from "react-redux";
import "./PostWithImage.scss";

const PostWithImage = () => {
  const { post } = useSelector((state) => state.posts);

  console.log(post);
  return (
    <div className="PostWithImage">
      <img
        src={post.img}
        alt={`Imagen de ${post.userId.username}`}
        className="PostWithImage__Img"
      />
      <h2>{post.title}</h2>
      <p>{post.body}</p>
    </div>
  );
};

export default PostWithImage;
