import React, {useState} from 'react'
import {HeartOutlined, HeartFilled, MessageOutlined, DoubleLeftOutlined, SendOutlined  } from '@ant-design/icons'
import { useSelector, useDispatch } from 'react-redux'
import { Modal , Segmented, Comment, Avatar , Divider , Input , Button} from 'antd'
import { addComment, like , unlike } from '../../../../../features/posts/postsSlice'
import { addLike , removeLike } from '../../../../../features/auth/authSlice'


const PhotoPost = ({post}) => {
    const { user } = useSelector((state) => state.auth)

    const dispatch = useDispatch()

    const [isModalVisibleUser, setIsModalVisibleUser] = useState(false);
    const [commentValue, setCommentValue] = useState("")
  
    const showModal = () => {
      setIsModalVisibleUser(true);
    };

    const handleOk = () => {
      setIsModalVisibleUser(false);
    };
  
    const handleCancel = () => {
      setIsModalVisibleUser(false);
    };

    const doALike = async()=>{
      await dispatch(like({postId:post._id, i:post.i}))
      await dispatch(addLike(post._id))
    }

    const doAnUnlike = async()=>{
      await dispatch(unlike({postId:post._id, i:post.i}))
      await dispatch(removeLike(post._id));
    }

    const sendComment = async(e) =>{
      await e.preventDefault()
      const comment = commentValue
      await setCommentValue("")
      await dispatch(addComment({i:post.i, postId:post._id, value:comment}))
    }

    const [value, setValue] = useState("comments")

    const allComments = post.comments.map(comment => {
      return(
        <>
          <Comment
            author={comment.author.username}
            avatar={comment.author.img?<Avatar src={`http://localhost:8080/porfile/${comment.author.img}`}/>:<Avatar>{comment.author.username.substring(0,1)}</Avatar>}
            content={comment.comment}
            style={{width:'100%'}}
          />
          <Divider style={{margin:'0'}}/>
        </>
      )
    })

    const allLikes = post.likes.map(like => {
      return(
        <>
          <div style={{display:'flex'}}>
            {like.img?<Avatar src={`http://localhost:8080/porfile/${like.img}`}/>:<Avatar>{like.username.substring(0,1)}</Avatar>}
            <h4>{like.username}</h4>
          </div>
          <Divider style={{margin:'0'}}/>
        </>
      )
    })
  
  return (
    <div>
    <div onClick={()=>showModal()} className='PhotoPost' key={post._id} style={{backgroundImage:`url("http://localhost:8080/postsImgs/${post.img}")`, width:'200px', height:'200px',backgroundSize:'cover', justifySelf:'center',display:'flex',justifyContent:'center',alignItems:'center'}}>
        <div>
          {user.likedPosts.includes(post._id)?<HeartFilled style={{color:'white'}}/>:<HeartOutlined style={{color:'white'}}/>}
          <p style={{color:'white'}}>{post.likes.length}</p>
        </div>
        <div>
          <MessageOutlined style={{color:'white'}}/>
          <p style={{color:'white'}}>{post.comments.length}</p>
        </div>
    </div>
        <Modal
        style={{minHeight:'80vh'}}
        width={'min(95vw,1300px)'}
        title={
          <div style={{display:'flex', alignItems:"center",gap:'10px'}}>
            {post.userId.img?<Avatar src={`http://localhost:8080/porfile/${post.userId.img}`}/>:<Avatar>{post.userId.username.substring(0,1)}</Avatar>}
            <h2 style={{marginBottom:0}}>{post.userId.username}</h2>
          </div>
        }
        visible={isModalVisibleUser} 
        onOk={()=>handleOk()} 
        onCancel={handleCancel}
        >
          <div style={{display:"flex",minHeight:'30vh'}}>
            <div style={{flex:1}}>
              <img src={`http://localhost:8080/postsImgs/${post.img}`} alt={post.title} style={{width:'100%'}} />
            </div>
            <div style={{width:'300px',display:'flex',flexDirection:'column',alignItems:'center'}}>
              <Segmented
                options={[
                  {value:'comments', icon: <MessageOutlined/>},
                  {value:'likes', icon: <HeartOutlined/>}
                ]}
                value={value}
                onChange={setValue}
              />
              <div style={{padding:'10px',position:'relative', height:'100%', width:'100%'}}>
                {value==='comments'?allComments:allLikes}
                {
                  value==='comments'
                  ?
                  <form style={{display:'flex', position:'absolute',width:'100%',bottom:0}} onSubmit={(e)=>sendComment(e)}>
                    <Input 
                    placeholder="Escribe tu comentario" 
                    bordered={false} 
                    name="comment"
                    value={commentValue}
                    onChange={(e)=>setCommentValue(e.target.value)}
                    prefix={<MessageOutlined/>}
                    />
                    <Button type="primary" icon={<SendOutlined />} htmlType="submit"/>
                  </form>
                  :
                  user.likedPosts.includes(post._id)?
                  <Button
                    style={{ position:'absolute',bottom:0, right:0}}
                    type="primary"
                    icon={<HeartFilled />}
                    onClick={()=>doAnUnlike()}
                    >
                    Quitar like
                  </Button>
                  :
                  <Button
                    style={{position:'absolute',bottom:0,right:0}}
                    type="primary"
                    icon={<HeartFilled />}
                    onClick={()=>doALike()}
                    >
                    Dar Like
                  </Button>
                }
              </div>
            </div>
          </div>
        </Modal>
        </div>
  )
}

export default PhotoPost