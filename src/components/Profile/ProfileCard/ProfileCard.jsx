import React, { useState } from "react";
import EditProfileInfo from "./EditProfileInfo/EditProfileInfo";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import ProfileStats from "./ProfileStats/ProfileStats";

const ProfileCard = ({ target }) => {
  const [edit, setEdit] = useState(false);

  return (
    <article className="ProfileCard">
      {edit ? (
        <EditProfileInfo setEdit={setEdit} />
      ) : (
        <ProfileInfo
          info={{
            username: target.username,
            img: target.img,
            _id: target._id,
            bio: target.bio,
          }}
          setEdit={setEdit}
        />
      )}

      <ProfileStats
        stats={{
          followers: target.followers,
          following: target.following,
          posts: target.postIds,
          from: target._id,
        }}
      />
    </article>
  );
};

export default ProfileCard;
