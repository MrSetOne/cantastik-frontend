const ProfileStats = ({stats}) => {
  return (
    <section className='ProfileStats' style={{display:'flex',gap:"20px"}}>
        <div>
            <h3>Followers</h3>
            <h4>{stats.followers.length}</h4>
        </div>
        <div>
            <h3>Following</h3>
            <h4>{stats.following.length}</h4>
        </div>
        <div>
            <h3>Posts</h3>
            <h4>{stats.posts.length}</h4>
        </div>
    </section>
  )
}

export default ProfileStats