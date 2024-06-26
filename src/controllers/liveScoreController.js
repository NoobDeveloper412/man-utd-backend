import axios from 'axios';

const BASE_URL = 'https://api.football-data.org/v4/';

export const fetchLiveScoreController = async (req, res) => {
    const API_KEY = process.env.FOOTBALL_API_KEY  // Replace with your Football Data API key

    try {
        // The live status filter is 'LIVE'
        const response = await axios.get(`${BASE_URL}matches?status=LIVE`, {
            headers: {
                'X-Auth-Token': API_KEY
            }
        });

        console.log(response.data)
        return res.json(response.data);
    } catch (error) {
        // Log the error and send a generic error message to the client
        console.error('Failed to fetch data:', error.message);

        // Check for response-specific errors and handle them
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            return res.status(error.response.status).json({
                success: false,
                message: 'Failed to fetch fixtures',
                error: error.message,
                details: error.response.data  // Include more details from the API response if necessary
            });
        } else if (error.request) {
            // The request was made but no response was received
            return res.status(503).json({
                success: false,
                message: 'No response from server',
                error: error.message
            });
        } else {
            // Something happened in setting up the request that triggered an Error
            return res.status(500).json({
                success: false,
                message: 'Error setting up the request',
                error: error.message
            });
        }
    }
};