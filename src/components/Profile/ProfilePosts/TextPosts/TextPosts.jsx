import { Empty } from "antd";
import TextPost from "./TextPost/TextPost";

const TextPosts = ({ posts }) => {
  const result = posts.map((post) => <TextPost post={post} />);
  return (
    <section className="TextPosts" style={{ width: "100%" }}>
      {posts.length === 0 ? (
        <Empty
          description={<span>Este usuario aun no ha publicado nada :(</span>}
        />
      ) : (
        result
      )}
    </section>
  );
};

export default TextPosts;
