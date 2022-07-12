import TextPost from "./TextPost/TextPost";

const TextPosts = ({ posts }) => {
  const result = posts.map((post) => <TextPost post={post} />);
  return (
    <section className="TextPosts" style={{ width: "100%" }}>
      {result}
    </section>
  );
};

export default TextPosts;
