import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { getAllBands } from '../api/bandsData';
import { getUserProfile } from '../api/profileData';
import BandCard from '../components/BandCard';
import { useAuth } from '../utils/context/authContext';

function Bands() {
  const [bands, setBands] = useState([]);
  const [profile, setProfile] = useState([]);
  const { user } = useAuth();

  const getAllTheBands = () => {
    getAllBands().then(setBands);
  };

  useEffect(() => {
    getAllTheBands();

    const getUserProfileData = () => {
      getUserProfile(user.uid).then(setProfile);
    };

    if (user?.uid) {
      getUserProfileData();
    }
  }, [user.uid]);

  const filteredBands = bands.filter((band) => band.created_by === profile[0]?.username);

  console.warn('user profile', profile);
  /* eslint-disable @next/next/no-img-element */

  return (
    <div
      className="text-center fade-in"
      style={{
        backgroundImage: 'url(/image-assets/your_bands_background.png)',
        backgroundSize: 'cover',
        height: '100vh',
        paddingTop: '14vh',
        margin: '0 auto',
      }}
    >
      <h1 id="signin-header">your bands</h1>
      <Link passHref href="/roleForm"><span id="new-band">create new role</span></Link>
      <br />
      <Link passHref href="/bandForm"><span id="new-band">create another band</span></Link>

      <div className="d-flex flex-wrap">
        {filteredBands.map((band) => (
          <BandCard key={band.band_id} bandObj={band} profileObj={profile} onUpdate={getAllTheBands} />
        ))}
      </div>

      <Link passHref href="/">

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

export default Bands;
