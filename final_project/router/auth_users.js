const express = require('express');
const jwt = require('jsonwebtoken');
const regd_users = express.Router();
const books = require('./booksdb.js');

let users = [];

// Middleware to authenticate token
function authenticateToken(req, res, next) {
    const token = req.header('Authorization');
    if (!token) return res.status(401).send('Access Denied');

    try {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = verified;
        next();
    } catch (err) {
        res.status(400).send('Invalid Token');
    }
}

// Task 6: Register a new user
regd_users.post('/register', (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).send('Username and password are required');
    }

    const userExists = users.some(user => user.username === username);
    if (userExists) {
        return res.status(400).send('Username already exists');
    }

    users.push({ username, password });
    res.send('User registered successfully');
});

// Route to add a book review
regd_users.post('/review/:isbn', authenticateToken, (req, res) => {
    const isbn = req.params.isbn;
    const review = req.body.review;
    const username = req.user.name;

    if (books[isbn]) {
        if (!books[isbn].reviews) {
            books[isbn].reviews = {};
        }
        books[isbn].reviews[username] = review;
        res.send('Review added successfully');
    } else {
        res.status(404).send('Book not found');
    }
});

module.exports.authenticated = regd_users;
