import axios from 'axios';

const api = axios.create({
    baseURL: 'https://kitsu.io/api/edge',
});

export async function getAnimes() {
    const response = await api.get('/anime');
    return response.data.data;
    }

export async function getAnimeById(id) {
    const response = await api.get(`/anime/${id}`);
    return response.data.data;
}
