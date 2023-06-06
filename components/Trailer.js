import React from 'react';
import YouTube from 'react-youtube';

const Trailer = ({ videoId }) => {
    const opts = {
        height: '315',
        width: '560',
        playerVars: {
        autoplay: 1,
        },
    };

    const onReady = (event) => {
        event.target.pauseVideo();
    };

    return (
        <div>
        <YouTube videoId={videoId} opts={opts} onReady={onReady} />
        </div>
    );
};

export default Trailer;