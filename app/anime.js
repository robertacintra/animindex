import React, { useEffect, useState } from 'react';
import { Modal, Button } from 'antd';
import axios from 'axios';

const Anime = ({ animeId, closeModal }) => {
    const [anime, setAnime] = useState(null);

    useEffect(() => {
        const fetchAnime = async () => {
        try {
            const response = await axios.get(`https://kitsu.io/api/edge/anime/${animeId}`);
            setAnime(response.data.data);
        } catch (error) {
            console.error('Error fetching anime:', error);
        }
        };

        fetchAnime();
    }, [animeId]);

    return (
        <div>
        <Modal
            title={anime && anime.attributes.canonicalTitle}
            visible={true}
            onCancel={closeModal}
            footer={null}
        >
            {anime && (
            <div>
                <img alt={anime.attributes.canonicalTitle} src={anime.attributes.posterImage.medium} />
                <p>{anime.attributes.description}</p>
            </div>
            )}
        </Modal>
        </div>
    );
};

export default Anime;
