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

async function fetchMatchesBySeason(competitionId, season) {
    const response = await axios.get(`http://api.football-data.org/v4/competitions/${competitionId}/matches?season=${season}`, {
        headers: { 'X-Auth-Token': process.env.FOOTBALL_API_KEY }
    });

    return response.data;
}


function extractBookings(matches) {
    const seasonBookings = [];
    console.log('Sorting season bookings...')

    matches.forEach(match => {
        // if (match.bookings.length > 0) {
            seasonBookings.push(match.bookings);
        // }
    });
    console.log('Sorted season bookings...')

    return seasonBookings;
}

export const getBookingsPerSeasonController = async (req, res) => {
    const API_KEY = process.env.FOOTBALL_API_KEY;
    const { filter } = req.body

    const { season } = filter

    try {
        // Step 1: Fetch Matches
        const { matches } = await fetchMatchesBySeason(2021, 2023);
        console.log("matches fetched")
        
        // return res.json({ matches: matches })
        const seasonBookings = extractBookings(matches);
        
        console.log("seasons bookings sorted")
        console.log(seasonBookings);
        
        
        // Step 2: Process Bookings (Major Challenge)
        // const bookingsPerTeam = processBookingsFromMatches(matches); 

        // Step 3: Sort (Easy once you have bookings data)
        // const sortedBookings = sortBookings(bookingsPerTeam);

        // // Step 4: Send Response
        // res.status(200).json({
        //   success: true,
        //   bookings: sortedBookings
        // });
    } catch (error) {
        // ... Add robust error handling similar to the previous example ...
    }
}
