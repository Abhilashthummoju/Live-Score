import React, { useState, useEffect } from "react";
import NavBar from "./NavBar";
import { TextField, Button } from '@mui/material';

const Teams = () => {
  // State for teams data
  const [teamsData, setTeamsData] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState('');

  useEffect(() => {
    fetch('http://localhost:8080/getTeams')
      .then(response => response.json())
      .then(data => {
        console.log("Teams Data", data);
        setTeamsData(data);
      })
      .catch(error => console.error('Error fetching teams data:', error));
  }, []);

  // Handler for team selection
  const handleTeamChange = (event) => {
    setSelectedTeam(event.target.value);
  };


  //post New Team
  const handleSubmit = () => {
    // Construct the data object for the new team
    const newTeamData = {
      teamName: selectedTeam
    };

    // Send a POST request to add the new team
    fetch('http://localhost:8080/addTeam', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newTeamData)
    })
    .then(response => response.json())
    .then(data => {
      console.log('New Team Added:', data);
      // Optionally update the state to reflect the changes
      setTeamsData(prevTeams => [...prevTeams, data]);
    })
    .catch(error => console.error('Error adding new team:', error));
  };

  return (
    <div style={styles.container}>
      <NavBar />
      <div style={{ marginTop: 50, display: 'flex', flexDirection: 'row' }}>
        {/* Existing team cards */}
        <div>
          {teamsData.map((team) => (
            <div key={team.id} style={styles.card}>
              <p style={{ color: 'white' }}><strong>Team:</strong> {team.teamName}</p>
              {/* Add more team details as needed */}
            </div>
          ))}
        </div>
        {/* New team form */}
        <div style={{ backgroundColor: 'white', borderRadius: 10, width: 500, position: 'absolute', right: 100, height: 400, justifyContent: 'center', display: 'flex', padding: 10, flexDirection: 'column' }}>
          <h1>Add Team</h1>
          <TextField
            label="Team Name"
            value={selectedTeam}
            onChange={handleTeamChange}
            variant="outlined"
            style={{ marginBottom: 20, minWidth: 120 }}
          />
          <Button variant="contained" color="primary" onClick={handleSubmit}>Add Team</Button>
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
    border: '1px solid #ccc',
    borderRadius: '5px',
    padding: '10px',
    margin: '10px',
    width: 350,
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#10439F',
    height: 100
  },
};

export default Teams;
