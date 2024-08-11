const jwt = require('jsonwebtoken');
const db = require('../models/db')
const bcrypt = require('bcrypt')

const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    db.all('SELECT * FROM users WHERE username = ?', [username], async (err, rows) => {
      if (err) {
        console.error('Error retrieving users:', err);
        return;
      }
      console.log('User data:', rows);
      if (rows.length === 0) {
        return res.status(400).send({ data: 'User not found' });
      }
      const isVerified = await bcrypt.compare(password, rows[0].password);

      if (isVerified) {
        const token = jwt.sign({ username }, 'SECRET');
        res.send({ token });
      } else {
        res.status(400).send({ data: 'Password is wrong' });
      }
    });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).send({ data: 'An error occurred during login' });
  }
};

const register = async (req, res) => {
  const { username, password, email } = req.body;

  try {
    db.all('SELECT * FROM users WHERE username = ?', [username], async (err, rows) => {
      if (err) {
        console.error('Error retrieving users:', err);
        return;
      }
      console.log('User data:', rows);
      if (rows.length > 0) {
        return res.status(400).send({ data: 'User already exists' });
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      db.run("INSERT INTO users (username, password, email) VALUES (?, ?, ?)", [username, hashedPassword, email], (err) => {
        if (err) {
          console.error('Error inserting sample user data:', err);
        } else {
          console.log('Sample user data inserted');

        }
      });
      const token = jwt.sign({ username }, process.env.JWT_SECRET || 'SECRET')
      res.send({ token });
    })
  } catch (error) {
    console.error('Error during registration:', error);
    res.status(500).send({ data: 'An error occurred during registration' })
  }
};



module.exports = { register, login }