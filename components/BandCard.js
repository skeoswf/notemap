import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { Button, Card } from 'react-bootstrap';
import { deleteBand } from '../api/bandsData';

function BandCard({ bandObj, onUpdate, profileObj }) {
  console.warn('BandCard profileObj:', profileObj);
  const deleteThisBand = () => {
    // Use the profileObj prop directly instead of calling getUserProfile()
    if (bandObj.created_by !== profileObj[0].username) {
      alert('this not ya band man');
    } else if (window.confirm('delete this band?')) {
      deleteBand(bandObj.band_id).then(() => onUpdate());
    }
  };

  return (
    <Card style={{ width: '16rem', margin: '10px' }}>
      <Card.Img variant="top" src={bandObj.band_image} alt={bandObj.band_name} style={{ height: '200px' }} />
      <Card.Body>
        <Card.Title>{bandObj.band_name}</Card.Title>
        <p>created by: {bandObj.created_by}</p>

        <Link href={`/bands/${bandObj.band_id}`} passHref>
          <Button variant="primary" className="m-2">
            view
          </Button>
        </Link>

        <Link href={`/bands/edit/${bandObj.band_id}`} passHref>
          <Button variant="info">edit</Button>
        </Link>

        <Button variant="danger" onClick={deleteThisBand} className="m-2">
          delete
        </Button>
      </Card.Body>
    </Card>
  );
}

BandCard.propTypes = {
  bandObj: PropTypes.shape({
    band_id: PropTypes.string,
    band_name: PropTypes.string,
    band_image: PropTypes.string,
    created_by: PropTypes.string,
  }).isRequired,
  profileObj: PropTypes.shape({
    username: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default BandCard;
