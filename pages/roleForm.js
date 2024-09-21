import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { Form, FloatingLabel } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { useAuth } from '../utils/context/authContext';
import { addRole, updateRole } from '../api/rolesData';

const initialState = {
  role_name: '',
  role_description: '',
  firebaseKey: '',
  uid: '',
};

// eslint-disable-next-line
function RoleForm({ obj }) {
  const [formInput, setFormInput] = useState(initialState);
  const router = useRouter();
  const { user } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = { ...formInput, uid: user.uid };

    addRole(payload).then((data) => {
      const firebaseKey = data[0];
      const patchPayload = { firebaseKey };

      updateRole(patchPayload).then(() => {
        router.push('/bands');
      });
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h2 className="text-white mt-5"> create role </h2>
      <FloatingLabel controlId="floatingInput1" label="role name" className="mb-3">
        <Form.Control type="text" placeholder="enter the role name" name="role_name" value={formInput.role_name} onChange={handleChange} required />
      </FloatingLabel>

      <FloatingLabel controlId="floatingInput2" label="role description" className="mb-3">
        <Form.Control type="text" placeholder="enter a role description" name="role_description" value={formInput.role_description} onChange={handleChange} required />
      </FloatingLabel>

      <button type="submit">
        create role
      </button>
    </Form>
  );
}

RoleForm.propTypes = {
  obj: PropTypes.shape({
    role_name: PropTypes.string,
    role_description: PropTypes.string,
    firebaseKey: PropTypes.string,
    uid: PropTypes.string,
  }).isRequired,
};

export default RoleForm;