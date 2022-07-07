import { Avatar , Modal , Button , Segmented , Comment , Divider , Input } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { HeartFilled , HeartOutlined , MessageOutlined , DoubleLeftOutlined , SendOutlined } from '@ant-design/icons'
import { useState } from 'react'
import { addComment, like , unlike } from '../../../../../features/posts/postsSlice'
import { addLike , removeLike } from '../../../../../features/auth/authSlice'



const TextPost = ({post}) => {


    const dispatch = useDispatch()

    const [modal, setModal] = useState(false)
    const [show, setShow] = useState("comments")
    const [commentValue, setCommentValue] = useState("")






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

    const sendComment = async(e) =>{
        await e.preventDefault()
        const comment = commentValue
        await setCommentValue("")
        await dispatch(addComment({i:post.i, postId:post._id, value:comment}))
    };

    const doALike = async()=>{
        await dispatch(like({postId:post._id, i:post.i}))
        await dispatch(addLike(post._id))
      }
  
      const doAnUnlike = async()=>{
        await dispatch(unlike({postId:post._id, i:post.i}))
        await dispatch(removeLike(post._id));
      }

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
  

    const { user } = useSelector((state) => state.auth)
    return (
        <article className="TextPost" style={{border:'1px solid gray'}}>
            <div>
                {post.userId.img?<Avatar size={45} src={`http://localhost:8080/porfile/${post.userId.img}`}/>:<Avatar>{post.userId.username.substring(0,1)}</Avatar>}
                <h2>{post.userId.username}</h2>
                <h3>{post.title}</h3>
                <p>{post.body}</p>
            </div>
            <div style={{display:'flex'}}>
                <div>
                     {user.likedPosts.includes(post._id)?<HeartFilled onClick={()=>doAnUnlike()}/>:<HeartOutlined onClick={()=>doALike()}/>} {/* AQUÍ TIENES QUE PONER LA OPCION DE DAR LIKE SIN MÁS */}
                    <p onClick={()=>setModal(true)}>{post.likes.length}</p>
                </div>
                <div>
                    <MessageOutlined onClick={()=>setModal(true)}/>
                    <p onClick={()=>setModal(true)} >{post.comments.length}</p>
                </div>
            </div>
            <Modal
            visible={modal}
            title={post.userId.username}
            onCancel={()=>setModal(false)}
            footer={[
                <Button 
                key="back" 
                onClick={()=>setModal(false)}
                type="primary"
                icon={<DoubleLeftOutlined />}
                >Volver
                </Button>
            ]}
            >
                <div style={{padding:'10px',position:'relative', height:'100%', width:'100%', display:'flex', flexDirection:'column', alignItems:'center'}}>
                    <Segmented
                    options={[
                    {value:'comments', icon: <MessageOutlined/>},
                    {value:'likes', icon: <HeartOutlined/>}
                    ]}
                    value={show}
                    onChange={setShow}
                    />
                    {show === "comments"?
                        <>
                            <div style={{maxHeight:'500px', overflow:'auto',marginBottom:'30px', width:'100%'}}>
                              {allComments}
                            </div>
                            <form style={{display:'flex', position:'absolute',width:'100%',bottom:0}} onSubmit={(e)=>sendComment(e)}>
                                <Input 
                                style={{flex:1}}
                                placeholder="Escribe tu comentario" 
                                bordered={false} 
                                name="comment"
                                value={commentValue}
                                onChange={(e)=>setCommentValue(e.target.value)}
                                prefix={<MessageOutlined/>}
                                />
                                <Button type="primary" icon={<SendOutlined />} htmlType="submit"/>
                            </form>
                        </>
                        :
                        <>
                            <div style={{maxHeight:'500px', overflow:'auto',marginBottom:'30px', width:'100%'}}>
                                {allLikes}
                            </div>
                            {user.likedPosts.includes(post._id)?
                                <Button
                                style={{ position:'absolute',bottom:0, right:0}}
                                type="primary"
                                icon={<HeartFilled />}
                                onClick={()=>doAnUnlike()}
                                >Quitar like</Button>
                            :
                                <Button
                                style={{position:'absolute',bottom:0,right:0}}
                                type="primary"
                                icon={<HeartFilled />}
                                onClick={()=>doALike()}
                                >Dar Like</Button>}
                        </>
                    }

                </div>

            </Modal>
    </article>
  )
}

export default TextPost