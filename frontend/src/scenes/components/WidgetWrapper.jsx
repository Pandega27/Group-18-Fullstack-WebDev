import React from 'react';
import '../css/WidgetWrapper.css'; // Import a custom CSS file for styling
import 'bootstrap/dist/css/bootstrap.min.css'

const WidgetWrapper = ({ children }) => {
  return (
    <div className="widget-wrapper">
      {children}
    </div>
  );
};

export default WidgetWrapper;
