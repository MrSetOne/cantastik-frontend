import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Avatar } from 'antd'

const PostWithImage = () => {
  const { post } = useSelector((state)=>state.posts)


  console.log(post)
  return (
    <div className='PostWithImage'>
      <Link to={`/profile/${post.userId._id}`}>
        {post.userId.img?
          <div>
            <Avatar src={`http://localhost:8080/porfile/${post.userId.img}`}/>
            <h2>{post.userId.username}</h2>
          </div>
        :
          <div>
            <Avatar>{post.userId.username.substring(0,1)}</Avatar>
            <h2>{post.userId.username}</h2>
          </div>
        }
      </Link>
      <img src={`http://localhost:8080/postsImgs/${post.img}`} className='Post__Img'/>
      <h2>{post.title}</h2>
      <p>{post.body}</p>
    </div>
  )
}

export default PostWithImage