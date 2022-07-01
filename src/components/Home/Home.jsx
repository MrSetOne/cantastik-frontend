import React, { useEffect } from 'react'
import { getPosts } from '../../features/posts/postsSlice'
import {useDispatch , useSelector} from 'react-redux'



const Home = () => {

  const {isLoading} = useSelector((state)=>state.posts)

  const dispatch = useDispatch()
  // const { user } = useSelector((state) => state.auth)
  
  useEffect(()=>{
    dispatch(getPosts())
  },[])


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
        <h1>Holi, soy el home</h1>
    </div>
  )
}

export default Home