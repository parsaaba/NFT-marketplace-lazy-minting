import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@mui/styles';
import { Typography, Grid } from '@mui/material';
import { Link, useHistory, useParams } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    // marginTop: 100,
    marginBottom: 100,
  },
  paper: {
    paddingLeft: '16px',
    paddingRight: '16px',
    paddingTop: '16px',
    marginLeft: theme.spacing(2),
  },
}));

// match params has the id from the router /:workId
function RelatedCategory() {
  const dispatch = useDispatch();

  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Grid
        container
        direction="row"
        sx={{
          marginTop: 8,
          padding: 1,
          border: '1px solid #A2A28F',
          maxHeight: 60,
          opacity: '50%',
        }}
      >
        <Grid item sm={1}>
          <Typography variant="subtitle1">Related</Typography>
          <Typography variant="subtitle1">Artworks</Typography>
        </Grid>
        <Grid
          container
          direction="row"
          item
          xs={10}
          sx={{
            marginLeft: 4,
          }}
        >
          <Grid item sm={10}>
            <Typography variant="subtitle1">Artworks</Typography>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

export default RelatedCategory;
