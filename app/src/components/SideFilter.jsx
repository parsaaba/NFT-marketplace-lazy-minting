/* eslint-disable prefer-destructuring */
/* eslint-disable no-nested-ternary */
import React, { useEffect, useState } from 'react';
import {
  AccordionDetails,
  AccordionSummary,
  Accordion,
  Grid,
} from '@mui/material';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useDispatch } from 'react-redux';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import PropTypes from 'prop-types';
import Checkbox from '@mui/material/Checkbox';
import { useHistory } from 'react-router-dom';

export default function SideFilter({ title, list, kind }) {
  const history = useHistory();
  const dispatch = useDispatch();

  const [value, setValue] = useState();

  // use params to check the checkbox
  useEffect(() => {
    let keyword = history.location.search;
    if (keyword && keyword.split('?regions=')[1]) {
      keyword = keyword.split('?regions=')[1].split('&')[0]; // example: ?regions=iran&page=1  ===> iran
      setValue(keyword);
    }
    if (keyword && keyword.split('?artist=')[1]) {
      keyword = keyword.split('?artist=')[1].split('&')[0]; // example: ?artist=اکبر&page=1  ===> اکبر
      setValue(keyword);
    }
    if (keyword && keyword.split('?category=')[1]) {
      keyword = keyword.split('?category=')[1].split('&')[0]; // example: ?artist=اکبر&page=1  ===> اکبر
      setValue(keyword);
    }
  }, [dispatch, history]);

  // change checkbox
  const handleChange = (e, item) => {
    setValue(e.target.name);
    if (item.country) {
      const country = e.target.name;
      history.push(`/${kind}/?regions=${country.toLowerCase()}`); // filter after push
    }
    if (item.firstName) {
      const artist = e.target.name;
      history.push(`/${kind}/?artist=${artist.toLowerCase()}`); // filter after push
    }
    if (item.name) {
      const category = e.target.name;
      history.push(`/${kind}/?category=${category}`); // filter after push
    }
  };

  return (
    <Grid container>
      {list && (
        <Accordion sx={{ boxShadow: 0, width: '100%' }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel-bh-content"
            id="panel-bh-header"
          >
            <Typography sx={{ width: '33%', flexShrink: 0 }}>
              {title}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Box sx={{ display: 'flex' }}>
              <FormControl required component="fieldset" variant="standard">
                {list.map((item, index) => (
                  <FormGroup key={index}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={
                            ((item.country && item.country.toLowerCase()) ||
                              (item.firstName &&
                                item.firstName.toLowerCase()) ||
                              (item.name && item.name.toLowerCase())) ===
                              value && true
                          }
                          onChange={(e) => handleChange(e, item)}
                          name={
                            item.country ||
                            (item._id && String(item._id)) ||
                            (item.id && String(item.id))
                          }
                        />
                      }
                      label={
                        item.country ||
                        item.name ||
                        `${item.firstName}  ${item.lastName}`
                      }
                    />
                  </FormGroup>
                ))}
              </FormControl>
            </Box>
          </AccordionDetails>
        </Accordion>
      )}
    </Grid>
  );
}

SideFilter.propTypes = {
  title: PropTypes.string.isRequired,
  list: PropTypes.array,
  kind: PropTypes.string.isRequired, // push to artwork or artist url
};
