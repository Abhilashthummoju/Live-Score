const express = require("express");
const cors = require("cors");
const db = require("./models"); // Sequelize instance and models
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Start the server
const PORT = 8080;
app.listen(PORT, () => {
  db.sequelize.sync({ force: false }).then(() => {
    console.log("Database has been started");
  });

  console.log(`Server is running on port ${PORT}.`);
});

// Get all users
app.get('/users', async (req, res) => {
  try {
    const users = await db.users.findAll();
    res.status(200).json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Signup a new user
app.post('/signup', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    console.log("Body signup:", req.body,name,email,password);

    // Create a new user
    const newUser = await db.users.create({
      name:name,
      email:email,
      password:password
    });

    console.log("User created successfully:", newUser);
    res.status(201).json({ message: 'Signup successful', user: newUser });
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ message: 'Internal server error' });
  }
});
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  console.log("body",email);
  try {
    // Find a user with the provided email and password
    const user = await db.users.findOne({ email, password, });

    if (user) {
      res.json({ message: 'Login successful',data: user });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.get('/getMatches', async (req, res) => {
  try {
    const matches = await db.matches.findAll();
    res.status(200).json(matches);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/matches/:matchId', async (req, res) => {
  // console.log("MATCH DETAILS",matchId);
  let matchId = parseInt(req.params.matchId);
  const match = await db.matches.findOne({
    where: {
      matchNo: matchId
    }
  });
  if (match) {
    res.json(match);
  } else {
    res.status(404).json({ error: 'Match not found' });
  }
});

app.get('/getTeams', async (req, res) => {
  const teams = await db.teams.findAll();
  if (teams) {
    res.json(teams);
  } else {
    res.status(404).json({ error: 'Match not found' });
  }
});

// Save a new match
app.post('/addMatch', async (req, res) => {
  try {
    const { team1, team2, date, venue } = req.body;

    // Create a new match
    const newMatch = await db.matches.create({
      team1: team1,
      team2: team2,
      date: date,
      venue: venue
    });

    console.log("Match created successfully:", newMatch);
    res.status(201).json({ message: 'Match added successfully', match: newMatch });
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Save a new team
app.post('/addTeam', async (req, res) => {
  try {
    const { teamName } = req.body;

    // Create a new team
    const newTeam = await db.teams.create({
      teamName: teamName
    });

    console.log("Team created successfully:", newTeam);
    res.status(201).json({ message: 'Team added successfully', team: newTeam });
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ message: 'Internal server error' });
  }
});


// Save a new contact
app.post('/addContact', async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Create a new contact
    const newContact = await db.contacts.create({
      name: name,
      email: email,
      message: message
    });

    console.log("Contact created successfully:", newContact);
    res.status(201).json({ message: 'Contact added successfully', contact: newContact });
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ message: 'Internal server error' });
  }
});



