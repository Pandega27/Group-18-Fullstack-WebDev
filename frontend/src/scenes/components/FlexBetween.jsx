import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'

const FlexBetween = ({ children }) => (
  <div className="d-flex justify-content-between align-items-center">
    {children}
  </div>
);

export default FlexBetween;
