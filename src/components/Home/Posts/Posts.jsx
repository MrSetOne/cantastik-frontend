import { useSelector} from 'react-redux'
import Post from './Post/Post'
import './Posts.scss'


const Posts = () => {

    const { posts} = useSelector((state)=>state.posts)

    const allPosts = posts.map((element, i) => <Post item={{...element,i}}/>)

  return (
    <section className='Posts'>
        {allPosts}
    </section>
  )
}

export default Posts