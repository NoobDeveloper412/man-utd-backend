import axios from 'axios';

const getTeamData = async (teamId) => {
    const API_KEY = process.env.FOOTBALL_API_KEY;  // Ensure you've set this in your environment variables
    const BASE_URL = 'https://api.football-data.org/v4/';

    try {
        const response = await axios.get(`${BASE_URL}teams/${teamId}`, {
            headers: { 'X-Auth-Token': API_KEY }
        });
        return response.data;
    } catch (error) {
        console.error('Failed to fetch standings:', error);
        return null;
    }
};


export const getTeamsController = async (req, res) => {
    const mensTeamData = await getTeamData(66);

    if (mensTeamData) {
        return res.status(200).json(mensTeamData)
    }
};




const getTeamScorers = async (id) => {
    const API_KEY = process.env.FOOTBALL_API_KEY;
    const BASE_URL = 'https://api.football-data.org/v4/';

    try {
        const response = await axios.get(`${BASE_URL}competitions/${id}/scorers?limit=10`, {
            headers: { 'X-Auth-Token': API_KEY }
        });
        return response.data;
    } catch (error) {
        console.error('Failed to fetch standings:', error);
        return null;
    }
}

export const getTeamScorersController = async (req, res) => {
    const PL = await getTeamScorers(2021)
    const CL = await getTeamScorers(2016)

    if (PL && CL) {
        return res.status(200).json({ PL, CL })
    }
}