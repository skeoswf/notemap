import React from 'react';
import { Button } from 'react-bootstrap';
import Link from 'next/link';
import { signIn } from '../utils/auth';

function Signin() {
  /* eslint-disable @next/next/no-img-element */
  return (
    <div>
      <div
        className="text-center d-flex flex-column justify-content-center align-content-center signin-div"
        style={{
          height: '100vh',
          padding: '30px',
          maxWidth: '400px',
          marginLeft: '11vw',
        }}
      >
        <h1 id="signin-header">notemap</h1>
        <Button type="button" size="lg" className="copy-btn landing-buttons" onClick={signIn}>
          sign in
        </Button>
        <Link passHref href="/about">
          <span className="landing-buttons">about</span>
        </Link>
      </div>
      <Link passHref href="https://github.com/skeoswf/notemap">
        <img
          src="/image-assets/github-logo-white.png"
          id="github-logo"
          alt="github-logo"
          width={55}
          height={55}
        />
      </Link>
    </div>
  );
}

export default Signin;
