import React, { useState } from 'react';
import { Segmented } from 'antd';
import PhotoPosts from './PhotoPosts/PhotoPosts';


const ProfilePosts = ({posts}) => {
    const [value, setValue] = useState("Fotos")

    let photoPosts = []
    let textPosts = []

    posts.forEach(post => post.img?photoPosts.push(post):textPosts.push(post));


    return (
    <section className='ProfilePosts'>
        <Segmented
        options={['Fotos', 'Texto']}
        value={value}
        onChange={setValue} />
        {value==="Fotos"?<PhotoPosts posts={photoPosts} />:null}
    </section>
  )
}

export default ProfilePosts