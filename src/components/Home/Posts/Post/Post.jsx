import React from 'react'
import { like , unlike } from '../../../../features/posts/postsSlice'
import { addLike , removeLike } from '../../../../features/auth/authSlice'
import { useSelector, useDispatch } from "react-redux";
import {HeartOutlined, HeartFilled } from '@ant-design/icons'
import {Avatar} from 'antd'

const Post = ({item}) => {
    const { user } = useSelector((state) => state.auth)
    const { posts} = useSelector((state)=>state.posts) //Esto lo puedo utilizar mas adelante para indicar que no hay ningun post (Ofrecer seguir a alguien)
    const dispatch = useDispatch()
    console.log(user);
    console.log(item)

    const doALike = async()=>{
      await dispatch(like(item._id))
      await dispatch(addLike(item._id))
    }

    const doAnUnlike = async()=>{
      await dispatch(unlike(item._id))
      await dispatch(removeLike(item._id));
    }

  return (
    <article className='Post'>
        {item.userId.img?<Avatar src={`http://localhost:8080/porfile/${item.userId.img}`}/>:<Avatar>{item.userId.username.substring(0,1)}</Avatar>}
        <h2>{item.userId.username}</h2>
        {item.img?<img src={`http://localhost:8080/postsImgs/${item.img}`}/>:null}
        <h3>{item.title}</h3>
        <p>{item.body}</p>
        {user.likedPosts.includes(item._id)?<HeartFilled onClick={()=>doAnUnlike()} />:<HeartOutlined onClick={()=>doALike()}/>}
        
    </article>
  )
}

export default Post