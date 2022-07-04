import React from 'react'
import {HeartOutlined, HeartFilled, MessageOutlined, DoubleLeftOutlined, SendOutlined  } from '@ant-design/icons'
import { useSelector, useDispatch } from 'react-redux'


const PhotoPost = ({post}) => {
    const { user } = useSelector((state) => state.auth)
  return (
    <div className='PhotoPost' key={post._id} style={{backgroundImage:`url("http://localhost:8080/postsImgs/${post.img}")`, width:'200px', height:'200px',backgroundSize:'cover', justifySelf:'center',display:'flex',justifyContent:'center',alignItems:'center'}}>
        <div>
          {user.likedPosts.includes(post._id)?<HeartFilled style={{color:'white'}}/>:<HeartOutlined style={{color:'white'}}/>}
          <p style={{color:'white'}}>{post.likes.length}</p>
        </div>
        <div>
          <MessageOutlined style={{color:'white'}}/>
          <p style={{color:'white'}}>{post.comments.length}</p>
        </div>
    </div>
  )
}

export default PhotoPost