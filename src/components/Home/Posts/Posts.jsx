import { useSelector} from 'react-redux'
import Post from './Post/Post'


const Posts = () => {

    const { posts} = useSelector((state)=>state.posts)

    const allPosts = posts.map(element => <Post item={element}/>)

  return (
    <section className='Posts'>
        <h1>holi</h1>
        {allPosts}
    </section>
  )
}

export default Posts