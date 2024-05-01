import axios from 'axios';

const API_KEY = process.env.FOOTBALL_API_KEY;  // Ensure you've set this in your environment variables
const BASE_URL = 'https://api.football-data.org/v4/';


const getStandings = async (competitionId) => {
    try {
        const response = await axios.get(`http://api.football-data.org/v4/competitions/PL/standings`, {
            headers: { 'X-Auth-Token': API_KEY }
        });
        return response.data;
    } catch (error) {
        console.error('Failed to fetch standings:', error);
        return null;
    }
};


export const fetchCompetitionsDataController = async () => {
    const PL = await getStandings(2021);
    const CL = await getStandings(2016);

    console.log('Premier League Standings:', PL);
    console.log('Champions League Standings:');

    if (PL && CL) {
        return res.status(200).json({ PL, CL })
    }
};


export const getFixturesController = async (req, res) => {
    const API_KEY = process.env.FOOTBALL_API_KEY  // Replace with your Football Data API key
    const teamId = '66';  // Manchester United's team ID in the Football Data API
    const { filter } = req.body

    try {
        const response = await axios.get(`${BASE_URL}teams/${teamId}/matches?status=${filter}`, {
            headers: {
                'X-Auth-Token': API_KEY
            }
        });

        // Assuming the API returns a list of matches in a 'matches' array
        res.json({
            success: true,
            data: response.data  // Modify according to actual API response structure
        });
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