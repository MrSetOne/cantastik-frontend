import React from 'react'
import {like} from '../../../../features/posts/postsSlice'
import {newInfo} from '../../../../features/auth/authSlice'
import { useSelector, useDispatch } from "react-redux";
import {HeartOutlined, HeartFilled } from '@ant-design/icons'
import {Avatar} from 'antd'

const Post = ({item}) => {
    const { user, token } = useSelector((state) => state.auth)
    const { posts} = useSelector((state)=>state.posts)
    const dispatch = useDispatch()
    console.log(user);
    console.log(item)


    const doALike = async()=>{
      await dispatch(like(item._id))
      await dispatch(newInfo())
    }

  return (
    <article className='Post'>
        {item.userId.img?<Avatar src={`http://localhost:8080/porfile/${item.userId.img}`}/>:<Avatar>{item.userId.username.substring(0,1)}</Avatar>}
        <h2>{item.userId.username}</h2>
        {item.img?<img src={`http://localhost:8080/postsImgs/${item.img}`}/>:null}
        <h3>{item.title}</h3>
        <p>{item.body}</p>
        {user.likedPosts.includes(item._id)?<HeartFilled/>:<HeartOutlined onClick={()=>doALike()}/>}
        
    </article>
  )
}

export default Post