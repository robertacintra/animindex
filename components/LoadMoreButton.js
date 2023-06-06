import React from 'react';
import { Button } from 'antd';

const LoadMoreButton = ({ onClick }) => {
    return (
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <Button onClick={onClick}>Load More</Button>
        </div>
    );
};

export default LoadMoreButton;
