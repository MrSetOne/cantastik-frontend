import React, { useState } from 'react';
import { Segmented } from 'antd';
import PhotoPosts from './PhotoPosts/PhotoPosts';
import TextPosts from './TextPosts/TextPosts';


const ProfilePosts = ({posts}) => {
    const [value, setValue] = useState("Fotos")

    let photoPosts = []
    let textPosts = []


    posts.forEach((post,i) => post.img?photoPosts.push({...post,i}):textPosts.push({...post,i}));


    return (
    <section className='ProfilePosts'>
        <Segmented
        options={['Fotos', 'Texto']}
        value={value}
        onChange={setValue} />
        {value==="Fotos"?<PhotoPosts posts={photoPosts} />:<TextPosts posts={textPosts}/>}
    </section>
  )
}

export default ProfilePosts