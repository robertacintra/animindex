import { Modal, Descriptions } from 'antd';
import Trailer from './Trailer';

const AnimeModal = ({ selectedAnime, modalVisible, handleCloseModal }) => {
    return (
        <Modal
            title={selectedAnime ? selectedAnime.attributes.canonicalTitle : ''}
            open={modalVisible}
            onCancel={handleCloseModal}
            footer={null}
            width={1000}
            className='modalAnime'
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
    );
};

export default AnimeModal;
