import React, {PropTypes} from 'react';

export const Description = (props) => (
  <p className="description">
    {props.children}
  </p>
);

Description.propTypes = {
  children: PropTypes.string.isRequired,
};
