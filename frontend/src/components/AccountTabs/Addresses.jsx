// components/Addresses.jsx
import React from 'react';

const Addresses = () => {
  return (
    <div className="addresses">
      <h2>Address</h2>
      <div className="address-cards">
        <div className="address-card">
          <h3>Billing Address</h3>
          <p>House/Building</p>
          <p>Street/Area</p>
          <p>City, State, ZIP</p>
          <button className="edit-button">Edit</button>
        </div>
        <div className="address-card">
          <h3>Shipping Address</h3>
          <p>House/Building</p>
          <p>Street/Area</p>
          <p>City, State, ZIP</p>
          <button className="edit-button">Edit</button>
        </div>
      </div>
    </div>
  );
};

export default Addresses;
