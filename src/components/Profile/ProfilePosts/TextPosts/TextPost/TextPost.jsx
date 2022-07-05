import {Avatar} from 'antd'
import { useSelector } from 'react-redux'
import { HeartFilled , HeartOutlined , MessageOutlined } from '@ant-design/icons'

const TextPost = ({post}) => {
    const { user } = useSelector((state) => state.auth)
  return (
    <article className="TextPost">
        <div>
            {post.userId.img?<Avatar size={45} src={`http://localhost:8080/porfile/${post.userId.img}`}/>:<Avatar>{post.userId.username.substring(0,1)}</Avatar>}
            <h3>{post.title}</h3>
            <p>{post.body}</p>
        </div>
        <div>
            <div>
                {user.likedPosts.includes(post._id)?<HeartFilled />:<HeartOutlined />}
                <p >{post.likes.length}</p>
            </div>
            <div>
                <MessageOutlined />
                <p>{post.comments.length}</p>
                </div>
        </div>
    </article>
  )
}

export default TextPost