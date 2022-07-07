import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Avatar } from 'antd'


const PostJustText = () => {
    const { post } = useSelector((state)=>state.posts)


    return (
        <div className='PostJustText'>
            <Link to={`/profile/${post.userId._id}`}>
                {
                post.userId.img?
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
            <h2>{post.title}</h2>
            <p>{post.body}</p>
        </div>
    )
}

export default PostJustText