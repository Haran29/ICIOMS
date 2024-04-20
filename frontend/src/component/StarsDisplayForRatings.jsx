import React from 'react';

function StarsDisplayForRatings({ count }) {
    const stars = Array.from({ length: 5 }, (_, i) => i < count ? '★' : '☆');
    return (
        <div style={{ color: 'gold', fontSize: '20px' }}>
            {stars.join('')} ({count})
        </div>
    );
}

export default StarsDisplayForRatings;