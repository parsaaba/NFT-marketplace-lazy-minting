import * as React from 'react';
import Alert from '@mui/material/Alert';
import PropTypes from 'prop-types';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

export default function Message({ icon, variant, children, severity }) {
  return (
    <Alert icon={icon} variant={variant} severity={severity}>
      {children}
    </Alert>
  );
}

Message.propTypes = {
  icon: PropTypes.node,
  variant: PropTypes.string,
  children: PropTypes.string,
  severity: PropTypes.string.isRequired,
};

Message.defaultProps = {
  icon: <CheckCircleOutlineIcon fontSize="inherit" />,
  children: '',
};
