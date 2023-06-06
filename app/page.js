"use client";
import { useEffect, useState } from 'react';
import { Card, Row, Col, Modal, Descriptions } from 'antd';
import axios from 'axios';
import Trailer from '../components/Trailer';
import LoadMoreButton from '../components/LoadMoreButton';

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
        <div style={{ padding: '20px' }}>
        <h1>Anime Catalogue</h1>
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

        {!loading && (
            
            <LoadMoreButton onClick={handleLoadMore}/>
            
        )}

        <Modal
            title={selectedAnime ? selectedAnime.attributes.canonicalTitle : ''}
            visible={modalVisible}
            onCancel={handleCloseModal}
            footer={null}
            width={1000}
        >
            {selectedAnime && (
            <div style={{ display: 'flex' }}>
                <div style={{ maxWidth: '400px' }}>
                    <img alt={selectedAnime.attributes.canonicalTitle} src={selectedAnime.attributes.posterImage.medium} />
                    <p>{selectedAnime.attributes.synopsis}</p>
                </div>

                <div style={{ paddingLeft: '20px' }}>
                    <Descriptions title="Anime Details" layout="vertical" bordered>
                        <Descriptions.Item label="Start Date">{selectedAnime.attributes.startDate}</Descriptions.Item>
                        <Descriptions.Item label="End Date">{selectedAnime.attributes.endDate}</Descriptions.Item>
                        <Descriptions.Item label="Episode Count">{selectedAnime.attributes.episodeCount}</Descriptions.Item>
                        <Descriptions.Item label="Episode Length">{selectedAnime.attributes.episodeLength} minutes</Descriptions.Item>
                        <Descriptions.Item label="Rating">{selectedAnime.attributes.averageRating}</Descriptions.Item>
                        <Descriptions.Item label="Age Rating">{selectedAnime.attributes.ageRating}</Descriptions.Item>
                        <Descriptions.Item label="Popularity Rank">{selectedAnime.attributes.popularityRank}</Descriptions.Item>
                    </Descriptions>
                    <div>
                        Trailer
                        

                        <Trailer videoId={selectedAnime.attributes.youtubeVideoId} />
                    </div>
                </div>
            </div>
            )}
        </Modal>
        </div>
    );
};

export default Home;
