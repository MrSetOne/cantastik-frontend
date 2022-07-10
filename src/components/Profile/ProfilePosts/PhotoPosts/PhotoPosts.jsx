import PhotoPost from "./PhotoPost/PhotoPost";
import "./PhotoPosts.scss";

const PhotoPosts = ({ posts }) => {
  const result = posts.map((post) => <PhotoPost post={post} />);
  return <section className="PhotoPosts">{result}</section>;
};

export default PhotoPosts;
