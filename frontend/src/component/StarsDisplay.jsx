// src/components/StarsDisplay.jsx
import React from 'react';
import './StarsDisplay.css'; // Assuming you will add some CSS

const StarsDisplay = ({ rating }) => {
  // Create an array of stars (0s and 1s to represent empty and filled stars)
  const stars = Array.from({length: 5}, (_, index) => index < rating ? '★' : '☆');

  return (
    <div>
      {stars.map((star, index) => (
        <span key={index} className="star">
          {star}
        </span>
      ))}
    </div>
  );
};

export default StarsDisplay;