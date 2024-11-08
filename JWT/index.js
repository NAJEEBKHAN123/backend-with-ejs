const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const users = [
    {
        username:"najeebkhan",
        password: 'khan'
    }
]; // Temporary storage, replace with a database in production
const SECRET_KEY = 'khankhan'; // Use an environment variable in production

// Signup route
app.post('/signup', async (req, res) => {
    const { username, password } = req.body;

    // Check if username and password are provided
    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required' });
    }

    try {
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
        users.push({ username, password: hashedPassword });
        res.json({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Error in hashing password:', error);
        res.status(500).json({ message: 'Server error' });
    }
});


  // Login route
app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username);
  
    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: '1h' });
      res.json({ token });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  });

  // Middleware to protect routes
function authenticateToken(req, res, next) {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'Token required' });
  
    jwt.verify(token, SECRET_KEY, (err, user) => {
      if (err) return res.status(403).json({ message: 'Invalid token' });
      req.user = user;
      next();
    });
  }
  

// Protected route example
app.get('/dashboard', authenticateToken, (req, res) => {
    res.json({ message: `Welcome, ${req.user.username}` });
  });

const PORT = 3000;
app.listen(PORT, () =>{
    console.log(`Server is listening on http://localhost:${PORT}`)
})