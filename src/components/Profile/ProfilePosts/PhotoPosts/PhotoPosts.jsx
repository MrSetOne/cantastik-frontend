import PhotoPost from "./PhotoPost/PhotoPost"

const PhotoPosts = ({posts}) => {
    const result = posts.map(post => <PhotoPost post={post} />)
  return (
    <section className="PhotoPosts" style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',width:'100%', justifyContent:'space-evenly', gap:'20px'}}>
        {result}
    </section>
  )
}

export default PhotoPosts