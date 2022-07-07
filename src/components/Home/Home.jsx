import React, { useEffect } from 'react'
import { getPosts } from '../../features/posts/postsSlice'
import {useDispatch , useSelector} from 'react-redux'
import Posts from './Posts/Posts'
import './Home.scss'



const Home = () => {

  const {isLoading, posts} = useSelector((state)=>state.posts)

  const dispatch = useDispatch()
  // const { user } = useSelector((state) => state.auth)
  
  useEffect(()=>{
    dispatch(getPosts())
  },[])

  console.log('AQUIIIII!!!');
  console.log(posts);


  return (
    <div className='home'>
      <div className='spinner__container' style={{display:isLoading?"flex":"none"}}>
        <div className="spinner">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
      {posts?<Posts/>:null}
      
    </div>
  )
}

export default Home