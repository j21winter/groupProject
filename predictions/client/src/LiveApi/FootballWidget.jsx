import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const FootballWidget = () => {
    const [fixtures, setFixtures] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    console.log(fixtures)

    const getFormattedDate = () => {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const fetchFixtures = async () => {
        const todaysDate = getFormattedDate();
        const options = {
            method: 'GET',
            url: 'https://api-football-v1.p.rapidapi.com/v3/fixtures',
            params: {
                date: '2024-01-20',//'2024-01-20'// // Fetch fixtures for today's date later 
                league: '39',
                season: '2023'
            },
            headers: {
                'X-RapidAPI-Key': '6556f401fdmsh659a29b0513d60ap1283f9jsn9b7b221696b6',
                'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com'
            }
        };
        try {
            const response = await axios.request(options);
            setFixtures(response.data.response);
            setLoading(false);
        } catch (error) {
            console.error(error);
            setError(error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchFixtures();
        const interval = setInterval(fetchFixtures, 60000); // Poll every 60 seconds
        return () => clearInterval(interval); // Clean up the interval on unmount
    }, []);

    if (loading) {
        return (<div>LOADING...</div>)}
    if (error) {
        return <div className="text-center mt-4">Error: {error.message}</div>;
    }
    
    
    return (
        <div className="container ">
            {fixtures.length === 0 &&
            <div className="container mt-5">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <div className="alert alert-info text-center">
                            <h4>No Live Matches Yet...</h4>
                            <p>Check back later for live match updates.</p>
                        </div>
                    </div>
                </div>
            </div>}
            <h2 className="text-center mb-4">Football Fixtures</h2>
            <div className="text-center ">
                <h5 className="bg-warning" style={{ display: 'inline-block' }}>LIVE</h5>
            </div>
            {fixtures.map((game, index) => (
                <div key={index} className="card mb-3 text-center">
                    <div className="card-header">
                        <strong>{game.league.name} - {game.league.season}</strong>
                    </div>
                    <div className="card-body">
                        <h5 className="card-title">
                            {game.teams.home.name} vs {game.teams.away.name}
                        </h5>
                        <p className="card-text">
                            <span className={`badge ${game.score.fulltime.home > game.score.fulltime.away ? 'bg-success' : 'bg-primary'} me-2`}>
                                {game.score.fulltime.home}
                            </span>
                            <span className={`badge ${game.score.fulltime.away > game.score.fulltime.home ? 'bg-success' : 'bg-secondary'}`}>
                                {game.score.fulltime.away}
                            </span>
                        </p>
                        <p className="card-text">
                            <small className="text-muted">
                                {new Date(game.fixture.date).toLocaleString()}
                            </small>
                        </p>
                        <p className="card-text">
                            Venue: {game.fixture.venue.name}, {game.fixture.venue.city}
                        </p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default FootballWidget;
