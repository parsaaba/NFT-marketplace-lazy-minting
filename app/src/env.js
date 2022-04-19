/* eslint-disable no-undef */

const env = process.env.NODE_ENV || 'local';

let envApiUrl = '';

if (env === 'prod') {
  envApiUrl = `${process.env.REACT_APP_DOMAIN_PROD}/api/v1`;
} else if (env === 'stage') {
  envApiUrl = `${process.env.REACT_APP_DOMAIN_STAGE}/api/v1`;
} else if (env === 'development') {
  envApiUrl = `${process.env.REACT_APP_DOMAIN_DEV}/api/v1`;
} else {
  envApiUrl = `${process.env.REACT_APP_DOMAIN_LOCAL}/api/v1`;
}

const apiUrl = envApiUrl;
export default apiUrl;
