import axios from 'axios';
import schedule from 'node-schedule';


let cachedData = null;
let lastFetchTime = null;

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


const fetchBookingsAndCards = async (season, competitionId) => {
    const BASE_URL = 'https://api.football-data.org/v4/';
    try {
        const response = await axios.get(`${BASE_URL}competitions/${competitionId}/matches?season=${season}`, {
            headers: { 'X-Auth-Token': "02957bc40f9c478ea398705304c2caf6", 'X-Unfold-Bookings': true }
        });

        const matches = response.data.matches;
        const bookingsAndCards = matches.map(match => ({
            matchId: match.id,
            bookings: match.bookings,
            cards: match.cards
        }));

        return bookingsAndCards;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
};

const refreshCache = async (season, competitionId) => {
    console.log('Refreshing cache...');
    try {
        cachedData = await fetchBookingsAndCards(season, competitionId);
        lastFetchTime = new Date();
        console.log('Cache updated at', lastFetchTime);
    } catch (error) {
        console.error('Error refreshing cache:', error);
    }
};

// Schedule cache refresh every 4 hours
schedule.scheduleJob('0 */4 * * *', () => {
    const season = '2024'; // Replace with your season variable
    const competitionId = 2021; // Replace with your competitionId variable
    refreshCache(season, competitionId);
});

// Initial cache load when the server starts
// refreshCache(2023, 2021);

export const getBookingsPerSeasonController = async (req, res) => {
    const { filter } = req.body;
    const { season, competitionId } = filter;

    console.log(season, competitionId);

    // Check if cache is empty or stale
    if (!cachedData) {
        await refreshCache(season, competitionId);
    }

    return res.json(cachedData);
};
