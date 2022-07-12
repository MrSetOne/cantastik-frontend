import { Empty } from "antd";
import PhotoPost from "./PhotoPost/PhotoPost";
import "./PhotoPosts.scss";

const PhotoPosts = ({ posts }) => {
  console.log(posts);
  const result = posts.map((post) => <PhotoPost post={post} />);
  return (
    <section className="PhotoPosts">
      {posts.length === 0 ? (
        <Empty
          description={<span>Este usuario aun no ha publicado nada :(</span>}
          style={{ margin: "0 auto", gridColumn: "1/4" }}
        />
      ) : (
        result
      )}
    </section>
  );
};

export default PhotoPosts;
