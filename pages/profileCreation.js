import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Form, FloatingLabel } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { useAuth } from '../utils/context/authContext';
import { createProfile } from '../api/profileData';

const initialState = {
  image: '',
  private: false,
  profile_created_data: '',
  state: '',
  uid: '',
  username: '',
};

function ProfileCreation({ obj }) {
  const [formInput, setFormInput] = useState(initialState);
  const router = useRouter();
  const { user } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (obj.uid) {
      console.warn('test');
    } else {
      const currentTime = new Date().toISOString();
      const payload = { ...formInput, uid: user.uid, profile_created_data: currentTime };
      createProfile(payload).then(() => {
        router.push('/');
      });
    }
  };

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
      <h1 id="signin-header">create your profile, {user.displayName.toLowerCase()}</h1>

      <Form onSubmit={handleSubmit} id="profile-creation-form">
        <FloatingLabel controlId="floatingInput1" label="username" className="mb-3">
          <Form.Control type="text" placeholder="enter your username" name="username" value={formInput.username} onChange={handleChange} required />
        </FloatingLabel>

        <FloatingLabel controlId="floatingInput1" label="image url" className="mb-3">
          <Form.Control type="text" placeholder="image-url" name="image" value={formInput.image} onChange={handleChange} required />
        </FloatingLabel>

        <FloatingLabel controlId="floatingSelect" label="state">
          <Form.Select
            aria-label="location"
            name="state"
            onChange={handleChange}
            className="mb-3"
            value={formInput.state}
            label="location"
            required
          >
            <option value="" disabled>select your role</option>
            <option value="alabama">alabama</option>
            <option value="alaska">alaska</option>
            <option value="arizona">arizona</option>
            <option value="arkansas">arkansas</option>
            <option value="california">california</option>
            <option value="colorado">colorado</option>
            <option value="connecticut">connecticut</option>
            <option value="delaware">delaware</option>
            <option value="florida">florida</option>
            <option value="georgia">georgia</option>
            <option value="hawaii">hawaii</option>
            <option value="idaho">idaho</option>
            <option value="illinois">illinois</option>
            <option value="indiana">indiana</option>
            <option value="iowa">iowa</option>
            <option value="kansas">kansas</option>
            <option value="kentucky">kentucky</option>
            <option value="louisiana">louisiana</option>
            <option value="maine">maine</option>
            <option value="maryland">maryland</option>
            <option value="massachusetts">massachusetts</option>
            <option value="michigan">michigan</option>
            <option value="minnesota">minnesota</option>
            <option value="mississippi">mississippi</option>
            <option value="missouri">missouri</option>
            <option value="montana">montana</option>
            <option value="nebraska">nebraska</option>
            <option value="nevada">nevada</option>
            <option value="new hampshire">new hampshire</option>
            <option value="new jersey">new jersey</option>
            <option value="new mexico">new mexico</option>
            <option value="new york">new york</option>
            <option value="north carolina">north carolina</option>
            <option value="north dakota">north dakota</option>
            <option value="ohio">ohio</option>
            <option value="oklahoma">oklahoma</option>
            <option value="oregon">oregon</option>
            <option value="pennsylvania">pennsylvania</option>
            <option value="rhode island">rhode island</option>
            <option value="south carolina">south carolina</option>
            <option value="south dakota">south dakota</option>
            <option value="tennessee">tennessee</option>
            <option value="texas">texas</option>
            <option value="utah">utah</option>
            <option value="vermont">vermont</option>
            <option value="virginia">virginia</option>
            <option value="washington">washington</option>
            <option value="west virginia">west virginia</option>
            <option value="wisconsin">wisconsin</option>
            <option value="wyoming">wyoming</option>
          </Form.Select>
        </FloatingLabel>

        <Form.Check
          id="private-select"
          className="text-white mb-3"
          type="switch"
          name="private"
          label="private"
          checked={formInput.private}
          onChange={(e) => {
            setFormInput((prevState) => ({
              ...prevState,
              private: e.target.checked,
            }));
          }}
        />

        <button type="submit">
          {obj.uid ? 'update' : 'create'} profile
        </button>
      </Form>

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

ProfileCreation.propTypes = {
  obj: PropTypes.shape({
    image: PropTypes.string,
    private: PropTypes.bool,
    profile_created_data: PropTypes.string,
    state: PropTypes.string,
    uid: PropTypes.string,
    username: PropTypes.string,
  }),
};

ProfileCreation.defaultProps = {
  obj: initialState,
};

export default ProfileCreation;
