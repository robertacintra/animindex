import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import axios from 'axios';

const Anime = () => {
    const router = useRouter();
    const { animeId } = router.query;
    const [anime, setAnime] = useState(null);

    useEffect(() => {
        const fetchAnime = async () => {
            try {
                const response = await axios.get(`https://kitsu.io/api/edge/anime/${animeId}`);
                setAnime(response.data);
            } catch (error) {
                console.error('Error fetching anime:', error);
            }
        };
    
        if (animeId) {
            console.log('Anime ID:', animeId);
            fetchAnime();
        }
    }, [animeId, router.query]);

    if (!anime) {
        return <div>Loading...</div>;
    }

    const attributes = anime.attributes;

    return (
        <div>
            <h1>{anime.attributes.canonicalTitle}</h1>
            <img src={anime.attributes.posterImage?.medium} alt={anime.attributes.canonicalTitle} />
            <p>{anime.attributes.synopsis}</p>
            <p>Start Date: {attributes.startDate}</p>
            <p>End Date: {attributes.endDate}</p>
            <p>Episode Count: {attributes.episodeCount}</p>
            <p>Episode Length: {attributes.episodeLength} minutes</p>
            <p>Rating: {attributes.averageRating}</p>
            <p>Age Rating: {attributes.ageRatingGuide}</p>
            <p>Popularity Rank: {attributes.popularityRank}</p>
        </div>
    );
};

export default Anime;
