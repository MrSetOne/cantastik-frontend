import TextPost from "./TextPost/TextPost";

const TextPosts = ({posts}) => {
    const result = posts.map(post => <TextPost post={post}/>)
  return (
    <section className="TextPosts">
        {result}
    </section>
  )
}

export default TextPosts