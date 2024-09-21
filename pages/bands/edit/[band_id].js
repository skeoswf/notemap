import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getSingleBand } from '../../../api/bandsData';
import BandForm from '../../bandForm';

export default function EditBand() {
  const [editBand, setEditBand] = useState({});
  const router = useRouter();
  // eslint-disable-next-line
  const { band_id } = router.query;

  useEffect(() => {
    getSingleBand(band_id).then(setEditBand);
    // eslint-disable-next-line
  }, [band_id]);

  return <BandForm obj={editBand} />;
}
