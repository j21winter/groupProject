import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

const LeaguePage = () => {
  const { id } = useParams();
  const [league, setLeague] = useState({});

  useEffect(() => {
    // Make an API call to get the details of the league by ID
    axios
      .get(`http://localhost:8000/api/league/${id}`)
      .then((res) => {
        setLeague(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  return (
    <div>
      <Link to={'/dashboard'}>Dashboard</Link>
      <h1>{league.league_name || 'Loading...'}</h1>
      {/* Display other league details as needed */}
    </div>
  );
};

export default LeaguePage;