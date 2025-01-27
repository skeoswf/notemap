import { Button } from 'react-bootstrap';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { signOut } from '../utils/auth';
import { useAuth } from '../utils/context/authContext';
import { getUserProfile } from '../api/profileData';

function Home() {
  const { user } = useAuth();
  const Router = useRouter();

  const [profile, setProfile] = useState('');
  const [hoverText, setHoverText] = useState('welcome to notemap');
  const [randomPicture, setRandomPicture] = useState('');

  useEffect(() => {
    const picture = Math.floor(Math.random() * 3);
    switch (picture) {
      case 0:
        setRandomPicture('/image-assets/landing_amp.png');
        break;
      case 1:
        setRandomPicture('/image-assets/landing_headphones.png');
        break;
      case 2:
        setRandomPicture('/image-assets/landing_microphone.png');
        break;
      default:
        setRandomPicture('/image-assets/landing_amp.png');
    }
  }, []);

  useEffect(() => {
    const checkUserProfile = () => {
      getUserProfile(user.uid)
        .then((profiles) => {
          console.warn('profiles:', profiles);
          if (profiles.length > 0) {
            setProfile(profiles[0]);
            setHoverText(`welcome to notemap, ${profiles[0].username}`);
            console.warn('user profile:', profiles[0]);
          } else {
            Router.push('/profileCreation');
          }
        })
        .catch((error) => {
          console.error('error fetching profiles:', error);
        });
    };
    if (user && user.displayName) {
      checkUserProfile();
      setHoverText(`welcome to notemap, ${profile.username}`);
    }
  }, [user, profile.username, Router]);

  return (
    /* eslint-disable @next/next/no-img-element */
    <div
      className="text-center fade-in"
      style={{
        backgroundImage: 'url(/image-assets/landing_background.png)',
        backgroundSize: 'cover',
        height: '100vh',
        paddingTop: '6vh',
        margin: '0 auto',
      }}
    >
      <div id="landing-div">

        <div className="circle-div">
          <Link passHref href="/bands">
            <div
              className="landing-circle"
              onMouseOver={() => setHoverText('view, create, and join bands')}
              onFocus={() => setHoverText('view, create, and join bands')}
            >bands
            </div>
          </Link>
          <Link passHref href="/gigs">
            <div
              className="landing-circle"
              onMouseOver={() => setHoverText('see and edit the bands youve created')}
              onFocus={() => setHoverText('see and edit the bands youve created')}
            >your bands
            </div>
          </Link>
        </div>

        <div>
          <img
            src={randomPicture}
            id="landing-floating"
            alt="floating-instrument"
            width={100}
            height={100}
          />
          <div
            id="hover-text"
          >
            {hoverText}
          </div>
        </div>

        <div className="circle-div">
          <Link passHref href={`${profile.username}`}>
            <div
              className="landing-circle"
              onMouseOver={() => setHoverText('view your profile and manage connections')}
              onFocus={() => setHoverText('view your profile and manage connections')}
            >profile
            </div>
          </Link>
          <Button
            variant="danger"
            type="button"
            size="lg"
            className="copy-btn landing-circle"
            id="sign-out"
            onMouseOver={() => setHoverText('sign out')}
            onFocus={() => setHoverText('sign out')}
            onClick={signOut}
          >
            sign out
          </Button>
        </div>
      </div>

    </div>
  );
}

export default Home;
