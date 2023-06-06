"use client";
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Row, Col, Button } from 'antd';
import Link from 'next/link';

const { Meta } = Card;

const Home = () => {
    const [animes, setAnimes] = useState([]);
    const [page, setPage] = useState(1);

    useEffect(() => {
        fetchAnimes();
    }, [page]);
    const fetchAnimes = async () => {
        try {
            const response = await axios.get(`https://kitsu.io/api/edge/anime?page[limit]=10&page[offset]=${(page - 1) * 10}`);
            const newAnimes = response.data.data;
            setAnimes(prevAnimes => [...prevAnimes, ...newAnimes]);
        } catch (error) {
            console.error('Error fetching animes:', error);
        }
    };

    const handleLoadMore = () => {
        setPage(prevPage => prevPage + 1);
    };

    return (
        <div>
            <h1>Anime Catalogue</h1>
            <Row gutter={[16, 16]}>
                {animes.map(anime => (
                <Col key={anime.id} xs={24} sm={12} md={8} lg={6} xl={4}>
                    <Link href={`/anime/${anime.id}`} passHref>
                    <Card
                        hoverable
                        cover={<img alt={anime.attributes.canonicalTitle} src={anime.attributes.posterImage.medium} />}
                        style={{ cursor: 'pointer' }}
                    >
                        <Meta title={anime.attributes.canonicalTitle} description={anime.attributes.startDate} />
                    </Card>
                    </Link>
                </Col>
                ))}
            </Row>
            <Button onClick={handleLoadMore} type="primary" style={{ marginTop: '16px' }}>
                Load More
            </Button>
        </div>
    );
};

export default Home;