import React from 'react'
import ProfileInfo from './ProfileInfo/ProfileInfo';
import ProfileStats from './ProfileStats/ProfileStats';

const ProfileCard = ({target}) => {
  return (
    <article className='ProfileCard'>
        <ProfileInfo info={{username:target.username,img:target.img}}/>
        <ProfileStats stats={{followers:target.followers, following:target.following, posts:target.postIds}}/>
    </article>
  )
}

export default ProfileCard