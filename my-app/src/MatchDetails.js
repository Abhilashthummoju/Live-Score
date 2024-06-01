import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NavBar from "./NavBar";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
} from "@mui/material";
import SportsCricketIcon from "@mui/icons-material/SportsCricket";
import SportsBaseballIcon from "@mui/icons-material/SportsBaseball";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import PeopleIcon from "@mui/icons-material/People";
import SportsScoreIcon from "@mui/icons-material/SportsScore";

const MatchDetails = () => {
  const { matchId } = useParams();

  const [battingTeam, setBattingTeam] = useState("");
  const [overs, setOvers] = useState("");
  const [runs, setRuns] = useState(0);
  const [wickets, setWickets] = useState(0);
  const [playersIND, setPlayersIND] = useState([]);
  const [playersAUS, setPlayersAUS] = useState([]);
  const [newPlayerIND, setNewPlayerIND] = useState("");
  const [newPlayerAUS, setNewPlayerAUS] = useState("");
  const [currentBatterIndex, setCurrentBatterIndex] = useState(0);
  const [batters, setBatters] = useState([{ name: "", runs: 0, balls: 0 }, { name: "", runs: 0, balls: 0 }]);
  const [currentBowler, setCurrentBowler] = useState("");
  const [history, setHistory] = useState([]);
  const [openRetireModal, setOpenRetireModal] = useState(false);
  const [openBowlerModal, setOpenBowlerModal] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:8080/matches/${matchId}`)
      .then((response) => response.json())
      .then((data) => {
        setBattingTeam(data.battingTeam || "");
        setOvers(data.overs || "");
        setRuns(data.runs || 0);
        setWickets(data.wickets || 0);
        setPlayersIND(data.playersIND || []);
        setPlayersAUS(data.playersAUS || []);
        setBatters(data.batters || [{ name: "", runs: 0, balls: 0 }, { name: "", runs: 0, balls: 0 }]);
        setCurrentBatterIndex(data.currentBatterIndex || 0);
        setCurrentBowler(data.currentBowler || "");
        setHistory([]);
      })
      .catch((error) => console.error("Error fetching match details:", error));
  }, [matchId]);

  const saveStateToHistory = () => {
    setHistory((prevHistory) => [
      ...prevHistory,
      { battingTeam, overs, runs, wickets, playersIND, playersAUS, batters: [...batters], currentBowler, currentBatterIndex },
    ]);
  };

  const handleScoreboardUpdate = () => {
    const updatedDetails = { battingTeam, overs, runs, wickets, playersIND, playersAUS, batters, currentBowler };
    fetch(`http://localhost:8080/matches/${matchId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedDetails),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Match details updated successfully");
      })
      .catch((error) => console.error("Error updating match details:", error));
  };

  const handleAddPlayerIND = () => {
    setPlayersIND([...playersIND, newPlayerIND]);
    setNewPlayerIND("");
  };

  const handleAddPlayerAUS = () => {
    setPlayersAUS([...playersAUS, newPlayerAUS]);
    setNewPlayerAUS("");
  };

  const handleSwapBatter = () => {
    setCurrentBatterIndex((prevIndex) => (prevIndex + 1) % 2);
  };

  const handleUpdateBatterDetails = (index, field, value) => {
    const updatedBatters = [...batters];
    updatedBatters[index][field] = value;
    setBatters(updatedBatters);
  };

  const handleWideBall = () => {
    saveStateToHistory();
    setRuns((prevRuns) => prevRuns + 1);
  };

  const handleNoBall = () => {
    saveStateToHistory();
    setRuns((prevRuns) => prevRuns + 1);
  };

  const handleWicket = () => {
    saveStateToHistory();
    setWickets((prevWickets) => prevWickets + 1);
  };

  const handleRetireBatter = () => {
    setOpenRetireModal(true);
  };

  const handleChangeBowler = () => {
    setOpenBowlerModal(true);
  };

  const handleSelectRetiredBatter = (batterName) => {
    setOpenRetireModal(false);
    setBatters((prevBatters) => {
      const updatedBatters = [...prevBatters];
      updatedBatters[currentBatterIndex] = { name: batterName, runs: 0, balls: 0 };
      return updatedBatters;
    });
  };

  const handleSelectNewBowler = (bowlerName) => {
    setOpenBowlerModal(false);
    setCurrentBowler(bowlerName);
  };

  const handleUndo = () => {
    if (history.length > 0) {
      const lastState = history[history.length - 1];
      setBattingTeam(lastState.battingTeam);
      setOvers(lastState.overs);
      setRuns(lastState.runs);
      setWickets(lastState.wickets);
      setPlayersIND(lastState.playersIND);
      setPlayersAUS(lastState.playersAUS);
      setBatters(lastState.batters);
      setCurrentBowler(lastState.currentBowler);
      setCurrentBatterIndex(lastState.currentBatterIndex);
      setHistory(history.slice(0, -1));
    }
  };

  const getBattingPlayers = () => {
    return battingTeam === "IND" ? playersIND : playersAUS;
  };

  return (
    <div>
      <NavBar />
      <div style={{ padding: 20 }}>
        <div
          style={{
            backgroundColor: "white",
            padding: 10,
            borderRadius: 10,
            marginBottom: 20,
          }}
        >
          <h1>
            <SportsCricketIcon /> Live Score
          </h1>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div style={{ fontSize: battingTeam === "IND" ? "1.5em" : "1em" }}>IND</div>
            <div>
              <h4>
                <SportsScoreIcon /> IND vs AUS
              </h4>
            </div>
            <div style={{ fontSize: battingTeam === "AUS" ? "1.5em" : "1em" }}>AUS</div>
          </div>
          <p>
            <strong>Overs:</strong> {overs}
          </p>
          <p>
            <strong>Runs:</strong> {runs}
          </p>
          <p>
            <strong>Wickets:</strong> {wickets}
          </p>
          <h4>Current Batters</h4>
          {batters.map((batter, index) => (
            <p key={index} style={{ fontWeight: currentBatterIndex === index ? "bold" : "normal" }}>
              {batter.name}: {batter.runs} ({batter.balls})
            </p>
          ))}
          <h4>Current Bowler</h4>
          <p>{currentBowler}</p>
        </div>

        <div
          style={{
            backgroundColor: "white",
            padding: 10,
            borderRadius: 10,
            marginBottom: 20,
          }}
        >
          <FormControl style={{ marginRight: 10 }}>
            <InputLabel id="batting-team-label">Batting Team</InputLabel>
            <Select
              labelId="batting-team-label"
              id="batting-team"
              value={battingTeam}
              onChange={(e) => setBattingTeam(e.target.value)}
            >
              <MenuItem value="IND">IND</MenuItem>
              <MenuItem value="AUS">AUS</MenuItem>
            </Select>
          </FormControl>
          <TextField
            label="Overs"
            type="number"
            value={overs}
            onChange={(e) => setOvers(e.target.value)}
            style={{ marginRight: 10 }}
          />
          <TextField
            label="Runs"
            type="number"
            value={runs}
            onChange={(e) => setRuns(parseInt(e.target.value, 10))}
            style={{ marginRight: 10 }}
          />
          <TextField
            label="Wickets"
            type="number"
            value={wickets}
            onChange={(e) => setWickets(parseInt(e.target.value, 10))}
            style={{ marginRight: 10 }}
          />
          <Button variant="contained" color="primary" onClick={handleScoreboardUpdate}>
            Update Scoreboard
          </Button>
        </div>

        <div
          style={{
            backgroundColor: "white",
            padding: 10,
            borderRadius: 10,
            marginBottom: 20,
          }}
        >
          <Button variant="contained" color="secondary" style={{ marginRight: 10 }} onClick={handleWideBall}>
            Wide
          </Button>
          <Button variant="contained" color="secondary" style={{ marginRight: 10 }} onClick={handleNoBall}>
            No Ball
          </Button>
          <Button variant="contained" color="secondary" style={{ marginRight: 10 }}>
            Byes
          </Button>
          <Button variant="contained" color="secondary" style={{ marginRight: 10 }}>
            Leg Byes
          </Button>
          <Button variant="contained" color="secondary" style={{ marginRight: 10 }} onClick={handleWicket}>
            Wicket
          </Button>
          <Button variant="contained" color="secondary" style={{ marginRight: 10 }} onClick={handleSwapBatter}>
            Swap Batter
          </Button>
          <Button variant="contained" color="secondary" style={{ marginRight: 10 }} onClick={handleRetireBatter}>
            Retire Batter
          </Button>
          <Button variant="contained" color="secondary" style={{ marginRight: 10 }} onClick={handleChangeBowler}>
            Change Bowler
          </Button>
          <Button variant="contained" color="secondary" style={{ marginRight: 10 }} onClick={handleUndo}>
            Undo
          </Button>
        </div>

        <div
          style={{
            backgroundColor: "white",
            padding: 10,
            borderRadius: 10,
            marginBottom: 20,
          }}
        >
          <h4>
            <PeopleIcon /> IND Players
          </h4>
          <Grid container spacing={2}>
            {playersIND.map((player, index) => (
              <Grid item key={index}>
                {player}
              </Grid>
            ))}
          </Grid>
          <div style={{ marginTop: 10 }}>
            <TextField
              label="Add Player to IND"
              value={newPlayerIND}
              onChange={(e) => setNewPlayerIND(e.target.value)}
              style={{ marginRight: 10 }}
            />
            <Button variant="contained" color="primary" onClick={handleAddPlayerIND}>
              Add Player to IND
            </Button>
          </div>
        </div>

        <div style={{ backgroundColor: "white", padding: 10, borderRadius: 10, marginBottom: 20 }}>
          <h4>
            <PeopleIcon /> AUS Players
          </h4>
          <Grid container spacing={2}>
            {playersAUS.map((player, index) => (
              <Grid item key={index}>
                {player}
              </Grid>
            ))}
          </Grid>
          <div style={{ marginTop: 10 }}>
            <TextField
              label="Add Player to AUS"
              value={newPlayerAUS}
              onChange={(e) => setNewPlayerAUS(e.target.value)}
              style={{ marginRight: 10 }}
            />
            <Button variant="contained" color="primary" onClick={handleAddPlayerAUS}>
              Add Player to AUS
            </Button>
          </div>
        </div>

        <div
          style={{
            backgroundColor: "white",
            padding: 10,
            borderRadius: 10,
            marginBottom: 20,
          }}
        >
          <h4>Current Batters</h4>
          <FormControl fullWidth style={{ marginBottom: 10 }}>
            <InputLabel id="current-batter-label">Select Striker</InputLabel>
            <Select
              labelId="current-batter-label"
              id="current-batter"
              value={batters[currentBatterIndex].name}
              onChange={(e) =>
                handleUpdateBatterDetails(currentBatterIndex, "name", e.target.value)
              }
            >
              {getBattingPlayers().map((player) => (
                <MenuItem key={player} value={player}>
                  {player}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          {batters.map((batter, index) => (
            <div key={index} style={{ display: "flex", alignItems: "center" }}>
              <TextField
                label="Name"
                value={batter.name}
                onChange={(e) => handleUpdateBatterDetails(index, "name", e.target.value)}
                style={{ marginRight: 10 }}
              />
              <TextField
                label="Runs"
                type="number"
                value={batter.runs}
                onChange={(e) => handleUpdateBatterDetails(index, "runs", parseInt(e.target.value, 10))}
                style={{ marginRight: 10 }}
              />
              <TextField
                label="Balls"
                type="number"
                value={batter.balls}
                onChange={(e) => handleUpdateBatterDetails(index, "balls", parseInt(e.target.value, 10))}
              />
              {currentBatterIndex === index && <span> (striker) </span>}
            </div>
          ))}
        </div>

        <div
          style={{
            backgroundColor: "white",
            padding: 10,
            borderRadius: 10,
            marginBottom: 20,
          }}
        >
          <h4>Current Bowler</h4>
          <FormControl fullWidth>
            <InputLabel id="current-bowler-label">Select Bowler</InputLabel>
            <Select
              labelId="current-bowler-label"
              id="current-bowler"
              value={currentBowler}
              onChange={(e) => setCurrentBowler(e.target.value)}
            >
              {battingTeam === "IND"
                ? playersAUS.map((player) => (
                    <MenuItem key={player} value={player}>
                      {player}
                    </MenuItem>
                  ))
                : playersIND.map((player) => (
                    <MenuItem key={player} value={player}>
                      {player}
                    </MenuItem>
                  ))}
            </Select>
          </FormControl>
        </div>
      </div>

      {/* Retire Batter Modal */}
      <Dialog open={openRetireModal} onClose={() => setOpenRetireModal(false)}>
        <DialogTitle>Select a Batter to Replace</DialogTitle>
        <DialogContent>
          <FormControl fullWidth>
            <InputLabel id="select-batter-label">Select Batter</InputLabel>
            <Select
              labelId="select-batter-label"
              id="select-batter"
              onChange={(e) => handleSelectRetiredBatter(e.target.value)}
              defaultValue=""
            >
              {getBattingPlayers().map((player) => (
                <MenuItem key={player} value={player}>
                  {player}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenRetireModal(false)} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>

      {/* Change Bowler Modal */}
      <Dialog open={openBowlerModal} onClose={() => setOpenBowlerModal(false)}>
        <DialogTitle>Select a New Bowler</DialogTitle>
        <DialogContent>
          <FormControl fullWidth>
            <InputLabel id="select-bowler-label">Select Bowler</InputLabel>
            <Select
              labelId="select-bowler-label"
              id="select-bowler"
              onChange={(e) => handleSelectNewBowler(e.target.value)}
              defaultValue=""
            >
              {battingTeam === "IND"
                ? playersAUS.map((player) => (
                    <MenuItem key={player} value={player}>
                      {player}
                    </MenuItem>
                  ))
                : playersIND.map((player) => (
                    <MenuItem key={player} value={player}>
                      {player}
                    </MenuItem>
                  ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenBowlerModal(false)} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default MatchDetails;

