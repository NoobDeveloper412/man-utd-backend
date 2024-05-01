
// https://newsapi.org/v2/top-headlines?country=gb&category=sports&apiKey=d0932633195444009b21ac7d914d908c

// https://newsapi.org/v2/top-headlines?country=us&category=sports&apiKey=d0932633195444009b21ac7d914d908c

import axios from 'axios';

const getNews = async () => {
    const API_KEY = process.env.NEWS_API_KEY;  // Ensure you've set this in your environment variables
    const BASE_URL = 'https://newsapi.org/v2/top-headlines?country=us&category=sports';

    try {
        const response = await axios.get(`${BASE_URL}&apiKey=${API_KEY}`, {
            headers: { 'X-Auth-Token': API_KEY }
        });
        return response.data;
    } catch (error) {
        console.error('Failed to fetch standings:', error);
        return null;
    }
};


export const fetchNewsController = async (req, res) => {
    const newsData = await getNews();
    console.log(newsData);
    if (newsData) {
        return res.status(200).json(newsData)
    }
};