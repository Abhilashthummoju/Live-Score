import React, { useEffect, useState } from "react";
import NavBar from "./NavBar";
import { FormControl, InputLabel, Select, MenuItem, TextField, Button } from '@mui/material';
import { Link, useHistory } from 'react-router-dom';

const Matches = () => {
  const [matchesData, setMatchesData] = useState([]);
  const [teamsList, setTeamsList] = useState([]);
  const [selectedTeam1, setSelectedTeam1] = useState('');
  const [selectedTeam2, setSelectedTeam2] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedVenue, setSelectedVenue] = useState('');

  useEffect(() => {
    fetch('http://localhost:8080/getMatches')
      .then(response => response.json())
      .then(data => {
        console.log("Matches Data",data);
        setMatchesData(data);
      })
      .catch(error => console.error('Error fetching match data:', error));

    fetch('http://localhost:8080/getTeams')
      .then(response => response.json())
      .then(data => {
        console.log("Teams Data", data);
        setTeamsList(data);
      })
      .catch(error => console.error('Error fetching teams data:', error));
  }, []);

  const handleTeam1Change = (event) => {
    setSelectedTeam1(event.target.value);
  };

  const handleTeam2Change = (event) => {
    setSelectedTeam2(event.target.value);
  };

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  const handleVenueChange = (event) => {
    setSelectedVenue(event.target.value);
  };

  const handleSubmit = () => {
    const newMatch = {
      team1: selectedTeam1,
      team2: selectedTeam2,
      date: selectedDate,
      venue: selectedVenue
    };

    postNewMatch(newMatch);
  };

  const postNewMatch = (newMatch) => {
    fetch('http://localhost:8080/addMatch', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newMatch)
    })
    .then(response => response.json())
    .then(data => {
      console.log('New match added:', data);
      // Optionally, you can update the matchesData state to include the new match
    })
    .catch(error => console.error('Error adding new match:', error));
  };

  return (
    <div style={styles.container}>
      <NavBar />
      <div style={{ marginTop: 50, display: 'flex', flexDirection: 'row' }}>
        <div> 
          {matchesData.map((match) => (
            <Link key={match.matchNo} to={`/matchDetails/${match.matchNo}`} style={{ textDecoration: 'none' }}>
              <div key={match.matchNo} style={styles.card} onClick={() => console.log("matche",match)}>
                <p style={{ color: 'white' }}><strong>Teams:</strong> {match.team1} vs {match.team2}</p>
                <p style={{ color: 'white' }}><strong>Date:</strong> {match.date}</p>
                <p style={{ color: 'white' }}><strong>Venue:</strong> {match.venue}</p>
              </div>
            </Link>
          ))}
        </div>
        <div style={{ backgroundColor: 'white', borderRadius: 10, width: 500, position: 'absolute', right: 100, height: 550, justifyContent: 'center', display: 'flex', padding: 10, flexDirection:'column' }}>
          <h1>Add Match</h1>
          <FormControl style={{ marginBottom: 20, minWidth: 120 }}>
            <InputLabel id="team1-label">Team 1</InputLabel>
            <Select
              labelId="team1-label"
              id="team1"
              value={selectedTeam1}
              onChange={handleTeam1Change}
            >
              {teamsList.map(team => (
                <MenuItem key={team.teamNo} value={team.teamName}>{team.teamName}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl style={{ marginBottom: 20, minWidth: 120 }}>
            <InputLabel id="team2-label">Team 2</InputLabel>
            <Select
              labelId="team2-label"
              id="team2"
              value={selectedTeam2}
              onChange={handleTeam2Change}
            >
              {teamsList.map(team => (
                <MenuItem key={team.teamNo} value={team.teamName}>{team.teamName}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            id="date"
            label="Date"
            type="date"
            value={selectedDate}
            onChange={handleDateChange}
            InputLabelProps={{
              shrink: true,
            }}
            style={{ marginBottom: 20 }}
          />
          <FormControl style={{ marginBottom: 20, minWidth: 120 }}>
            <InputLabel id="venue-label">Venue</InputLabel>
            <Select
              labelId="venue-label"
              id="venue"
              value={selectedVenue}
              onChange={handleVenueChange}
            >
              <MenuItem value="Stadium X">Stadium X</MenuItem>
              <MenuItem value="Stadium Y">Stadium Y</MenuItem>
              {/* Add more venues as needed */}
            </Select>
          </FormControl>
          <Button variant="contained" color="primary" onClick={handleSubmit}>Submit</Button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
  },
  card: {
    cursor:"pointer",
    border: '1px solid #ccc',
    borderRadius: '5px',
    padding: '10px',
    margin: '10px',
    width: 450,
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#10439F',
    height: 170
  },
};

export default Matches;
