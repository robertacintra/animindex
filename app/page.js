"use client"
import React, { useEffect, useState } from 'react';
import { Card, Row, Col } from 'antd';
import axios from 'axios';
import Link from 'next/link';

const { Meta } = Card;

const Home = () => {
    const [animes, setAnimes] = useState([]);

    useEffect(() => {
        const fetchAnimes = async () => {
        try {
            const response = await axios.get('https://kitsu.io/api/edge/anime');
            setAnimes(response.data.data);
        } catch (error) {
            console.error('Error fetching animes:', error);
        }
        };

        fetchAnimes();
    }, []);

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
                >
                    <Meta title={anime.attributes.canonicalTitle} description={anime.attributes.startDate} />
                </Card>
                </Link>
            </Col>
            ))}
        </Row>
        </div>
    );
};

export default Home;
