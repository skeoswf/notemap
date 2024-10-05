import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { Button, Card } from 'react-bootstrap';
import { deleteBand } from '../api/bandsData';
import { getSingleRole } from '../api/rolesData';

function BandCard({
  bandObj, onUpdate, profileObj,
}) {
  console.warn('BandCard profileObj:', profileObj);

  const deleteThisBand = () => {
    if (bandObj.created_by !== profileObj[0].username) {
      alert('this not ya band man!!');
    } else if (window.confirm('Delete this band?')) {
      deleteBand(bandObj.band_id).then(() => onUpdate());
    }
  };

  const [singleRole, setSingleRole] = useState({});

  useEffect(() => {
    getSingleRole(bandObj.role).then((singleRoleObj) => {
      setSingleRole(singleRoleObj);
    });
  }, [bandObj.band_id, singleRole, bandObj.role]);

  return (
    <Card style={{
      width: '16rem', margin: '35px', marginTop: '100px', marginLeft: '100px',
    }}
    >
      <Card.Img variant="top" src={bandObj.band_image} alt={bandObj.band_name} style={{ height: '200px' }} />
      <Card.Body>
        <Card.Title>{bandObj.band_name}</Card.Title>
        <p>created by {bandObj.created_by}
          <br />
        </p>
        <p> <span style={{ textDecoration: 'underline' }}>{singleRole.role_name} </span>
          <br />
          {singleRole.role_description}
        </p>

        {/* <div className="d-flex flex-wrap rolesTest">
          {bandRoles.length === 0 ? (
            <p>no roles available</p>
          ) : (
            bandRoles.map((bandRole) => (
              bandRole.in_band ? (
                <p key={bandRole.band_roles_id}>{bandRole.role}</p>
              ) : null
            ))
          )}
        </div> */}

        <Link href={bandObj.created_by} passHref>
          <Button
            variant="primary"
            className="m-2 band-contact"
            hidden={bandObj.created_by === profileObj[0]?.username}
            style={{
              width: '200px',
            }}
            id="band-contact"
          >
            contact band creator
          </Button>
        </Link>

        <Link href={`/bands/edit/${bandObj.band_id}`} passHref>
          <Button
            variant="info"
            hidden={bandObj.created_by !== profileObj[0]?.username}
            style={{
              width: '200px',
            }}
          >edit
          </Button>
        </Link>

        <Button variant="danger" onClick={deleteThisBand} className="m-2" hidden={bandObj.created_by !== profileObj[0]?.username}>
          delete
        </Button>
      </Card.Body>
    </Card>
  );
}

BandCard.propTypes = {
  bandObj: PropTypes.shape({
    band_id: PropTypes.string.isRequired,
    band_name: PropTypes.string.isRequired,
    band_image: PropTypes.string.isRequired,
    created_by: PropTypes.string.isRequired,
    role: PropTypes.string.isRequired,
  }).isRequired,
  profileObj: PropTypes.shape({
    username: PropTypes.string.isRequired,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default BandCard;
