/* eslint-disable react/button-has-type */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import ImageUploading from 'react-images-uploading';
import { Grid, Button, Box } from '@mui/material';

export default function UploadImage() {
  const [images, setImages] = useState([]);
  const maxNumber = 1;
  const onImageChange = (imageList) => {
    // data for submit
    setImages(imageList);
  };

  return (
    <Box
      sx={{
        width: '100%',
        height: 300,
        marginBottom: 5,
        marginTop: 2,
        bgcolor: 'lightGray',
        ':hover': {
          opacity: [0.9, 0.8, 0.7],
        },
      }}
    >
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
      >
        <ImageUploading
          value={images}
          onChange={onImageChange}
          maxNumber={maxNumber}
          dataURLKey="data_url"
        >
          {({
            imageList,
            onImageUpload,
            // onImageRemoveAll,
            onImageUpdate,
            onImageRemove,
            isDragging,
            dragProps,
          }) => (
            // write your building UI
            <Grid className="upload__image-wrapper">
              <Button
                style={isDragging ? { color: 'red' } : null}
                onClick={onImageUpload}
                {...dragProps}
              >
                آپلود عکس
              </Button>
              &nbsp;
              {/* <Button onClick={onImageRemoveAll}>پاک کردن</Button> */}
              {imageList.map((image, index) => (
                <Grid
                  key={index}
                  container
                  direction="column"
                  justifyContent="center"
                  alignItems="center"
                >
                  <img
                    // onChange={(e) => setImage(e.target.value)}
                    value={image.file.name || image}
                    src={image.data_url}
                    alt=""
                    width="60%"
                    style={{ maxHeight: 350 }}
                  />
                  <Grid className="image-item__btn-wrapper">
                    <Button onClick={() => onImageUpdate(index)}>ویرایش</Button>
                    <Button onClick={() => onImageRemove(index)}>
                      پاک کردن
                    </Button>
                  </Grid>
                </Grid>
              ))}
            </Grid>
          )}
        </ImageUploading>
      </Grid>
    </Box>
  );
}
