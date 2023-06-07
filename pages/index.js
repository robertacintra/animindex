"use client";
import { useEffect, useState } from 'react';
import { Card, Row, Col } from 'antd';
import axios from 'axios';
import LoadMoreButton from '../components/LoadMoreButton';
import AnimeModal from '../components/AnimeModal';

const { Meta } = Card;

const Home = () => {
    const [animes, setAnimes] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedAnime, setSelectedAnime] = useState(null);

    const handleLoadMore = async () => {
        setPage(prevPage => prevPage + 1);
    };

    useEffect(() => {
        fetchAnimes();
    }, [page]);

    const fetchAnimes = async () => {
        setLoading(true);
        try {
        const response = await axios.get(`https://kitsu.io/api/edge/anime?page[limit]=10&page[offset]=${(page - 1) * 10}`);
        const newAnimes = response.data.data;
        setAnimes(prevAnimes => [...prevAnimes, ...newAnimes]);
        } catch (error) {
        console.error('Error fetching animes:', error);
        }
        setLoading(false);
    };

    const handleOpenModal = (anime) => {
        setSelectedAnime(anime);
        setModalVisible(true);
    };

    const handleCloseModal = () => {
        setSelectedAnime(null);
        setModalVisible(false);
    };

    return (
        <div className='containerHome'>
        <h1 style={{ marginBottom: '20px'}}>Anime Catalogue</h1>
        <Row gutter={[16, 16]}>
            {animes.map((anime) => (
            <Col key={anime.id} xs={24} sm={12} md={8} lg={6} xl={4}>
                <Card
                hoverable
                cover={<img alt={anime.attributes.canonicalTitle} src={anime.attributes.posterImage.medium} />}
                style={{ cursor: 'pointer' }}
                onClick={() => handleOpenModal(anime)}
                >
                <Meta title={anime.attributes.canonicalTitle} description={anime.attributes.startDate} />
                </Card>
            </Col>
            ))}
        </Row>

        {loading && <p>Loading...</p>}

        {!loading && <LoadMoreButton onClick={handleLoadMore} />}

        <AnimeModal
            selectedAnime={selectedAnime}
            modalVisible={modalVisible}
            handleCloseModal={handleCloseModal}
            
        />
        </div>
    );
};

export default Home;
