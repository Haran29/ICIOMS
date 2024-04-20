// src/components/StarRating.jsx
import React from 'react';
import './StarRating.css';  // Assuming you have some basic CSS for styling

const StarRating = ({ rating, onRatingChange }) => {
  return (
    <div>
      {[1, 2, 3, 4, 5].map((index) => (
        <span key={index} onClick={() => onRatingChange(index)}>
          {index <= rating ? '★' : '☆'}
        </span>
      ))}
    </div>
  );
};

export default StarRating;