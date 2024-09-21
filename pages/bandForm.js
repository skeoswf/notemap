import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Form, FloatingLabel } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { useAuth } from '../utils/context/authContext';
import { createBand, updateBand } from '../api/bandsData';
import { getUserProfile } from '../api/profileData';
import { getRoles } from '../api/rolesData';

const initialState = {
  band_image: '',
  band_name: '',
  role: '',
  private: false,
};

function BandForm({ obj }) {
  const [formInput, setFormInput] = useState(initialState);
  const [profile, setProfile] = useState({});
  const [roles, setRoles] = useState([]);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    getUserProfile(user.uid).then(setProfile);
    getRoles().then(setRoles);
    if (obj.band_id)setFormInput(obj);
  }, [obj, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.warn('Profile on submit:', profile);
    if (obj.band_id) {
      updateBand(formInput).then(() => router.push('/bands'));
    } else {
      const currentTime = new Date().toISOString();
      const payload = { ...formInput, band_created_date: currentTime, created_by: profile[0].username };
      createBand(payload).then(({ name }) => {
        const patchPayload = { band_id: name };
        updateBand(patchPayload).then(() => {
          router.push('/bands');
        });
      });
    }
  };

  console.warn('user profile', profile);
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
      <h1 id="signin-header">{(obj.band_id) ? 'update' : 'create'} band</h1>

      <Form onSubmit={handleSubmit} id="band-creation-form">

        <FloatingLabel controlId="floatingInput1" label="band name" className="mb-3">
          <Form.Control type="text" placeholder="band-name" name="band_name" value={formInput.band_name} onChange={handleChange} required />
        </FloatingLabel>

        <FloatingLabel controlId="floatingInput1" label="image url" className="mb-3">
          <Form.Control type="text" placeholder="image url" name="band_image" value={formInput.band_image} onChange={handleChange} required />
        </FloatingLabel>

        <FloatingLabel controlId="floatingSelect" label="role">
          <Form.Select
            aria-label="location"
            name="role"
            onChange={handleChange}
            className="mb-3"
            value={formInput.role}
            required
          >
            {roles.map((role) => (
              <option key={role.firebaseKey} value={role.firebaseKey}>
                {role.role_name}
              </option>
            ))}
          </Form.Select>
        </FloatingLabel>

        <Form.Check
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
          {(obj.band_id) ? 'update' : 'create'} band
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

BandForm.propTypes = {
  obj: PropTypes.shape({
    band_created_date: PropTypes.string,
    band_id: PropTypes.string,
    band_image: PropTypes.string,
    band_name: PropTypes.string.isRequired,
    created_by: PropTypes.string,
    private: PropTypes.bool,
    role: PropTypes.string,
  }),
};

BandForm.defaultProps = {
  obj: initialState,
};

export default BandForm;
