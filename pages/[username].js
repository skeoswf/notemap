import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { getUserProfileByUsername } from '../api/profileData';

function Profile() {
  const [userProfile, setUserProfile] = useState({});
  const router = useRouter();
  const { username } = router.query;

  useEffect(() => {
    if (username) {
      getUserProfileByUsername(username).then((profile) => {
        setUserProfile(profile[0]);
      });
    }
  }, [username]);

  return (
    /* eslint-disable @next/next/no-img-element */
    <div
      className="text-center fade-in"
      style={{
        backgroundImage: 'url(/image-assets/profile_background.png)',
        backgroundSize: 'cover',
        height: '100vh',
        paddingTop: '14vh',
        margin: '0 auto',
      }}
    >
      <h1 id="profile-username">{username}</h1>
      <p
        style={{
          color: 'rgb(242, 254, 255)',
          textShadow: '0px 0px 2px rgb(248, 167, 253)',
          fontFamily: 'Raleway',
        }}
      >
        {userProfile.email}
      </p>

      <img
        src={userProfile.image}
        width={100}
        height={100}
        alt="profile-image"
        id="profile-image"
      />

      <p
        style={{
          color: 'rgb(242, 254, 255)',
          textShadow: '0px 0px 2px rgb(248, 167, 253)',
          paddingTop: '20px',
          fontSize: '1.25rem',
          fontFamily: 'Raleway',
        }}
      >
        profile created on {new Date(userProfile.profile_created_data).toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}
        <br />
        based in {userProfile.state}
      </p>

      <Link passHref href="/bands">
        <img
          src="/image-assets/backarrow.png"
          id="backarrow"
          alt="backarrow"
          width={45}
          height={45}
        />
      </Link>
    </div>
  );
}

export default Profile;
