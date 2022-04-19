/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React, { useEffect, useState } from 'react';
import { Typography } from '@mui/material';
import axios from 'axios';

export default function TheArtist({ artwork }) {
  const [theArtist, setTheArtist] = useState('');

  // to prevent the following when searching: Can't perform a React state update on an unmounted component
  // isSubscribed condition and clean up helps not setting state when component is unmounted
  useEffect(() => {
    let isSubscribed = true;
    const fetchArtistLocally = async () => {
      const { data } = await axios.get(`/api/artists/${artwork.artist}`);
      if (isSubscribed) {
        setTheArtist(data);
      }
    };
    fetchArtistLocally();
    return () => {
      isSubscribed = false;
    };
  }, [artwork]);

  return (
    <Typography variant="h6">
      {theArtist.firstName} {theArtist.lastName}
    </Typography>
  );
}
