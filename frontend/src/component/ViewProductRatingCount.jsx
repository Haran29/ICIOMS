import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card } from 'react-bootstrap';
import StarsDisplay from './StarsDisplayForRatings'; // Ensure correct import

function ViewProductRatingCount({ productName }) {
    const [ratingCount, setRatingCount] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        if (productName) {
            fetchRatingCount();
        }
    }, [productName]);

    const fetchRatingCount = () => {
        axios.get(`/Nisal/feedbacks/ratings/count/${encodeURIComponent(productName)}`)
            .then(response => {
                const { ratingCount } = response.data;
                setRatingCount(ratingCount);
                setError('');  // Clear any previous errors
            })
            .catch(error => {
                setError('Failed to fetch rating count');
                setRatingCount(null);  // Clear any previous rating count
            });
    };

    return (
        <Card className="m-3 p-3">
            {ratingCount !== null && (
                <StarsDisplay count={ratingCount} />
            )}
            {error && (
                <Card.Text style={{ color: 'red' }}>{error}</Card.Text>
            )}
        </Card>
    );
}

export default ViewProductRatingCount;