import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { getAllBands } from '../api/bandsData';
import BandCard from '../components/BandCard';

function Bands() {
  const [bands, setBands] = useState([]);

  const getAllTheBands = () => {
    getAllBands().then(setBands);
  };

  useEffect(() => {
    getAllTheBands();
  }, []);

  return (
    /* eslint-disable @next/next/no-img-element */
    <div
      className="text-center fade-in"
      style={{
        backgroundImage: 'url(/image-assets/landing_background.png)',
        backgroundSize: 'cover',
        height: '100vh',
        paddingTop: '14vh',
        margin: '0 auto',
      }}
    >
      <h1 id="signin-header">bands</h1>

      <div className="d-flex flex-wrap">
        {bands.map((band) => (
          <BandCard key={band.band_id} bandObj={band} onUpdate={getAllTheBands} />
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
