const express = require('express');
const public_users = express.Router();
const books = require('./booksdb.js');

// Task 1: Get the list of books available in the shop
public_users.get('/', function (req, res) {
    res.json(books);
});

// Task 2: Get book details based on ISBN
public_users.get('/isbn/:isbn', function (req, res) {
    const isbn = req.params.isbn;
    const book = books[isbn];
    if (book) {
        res.json(book);
    } else {
        res.status(404).send('Book not found');
    }
});

// Task 3: Get book details based on the author
public_users.get('/author/:author', function (req, res) {
    const author = req.params.author;
    const result = [];
    for (const bookId in books) {
        if (books[bookId].author === author) {
            result.push(books[bookId]);
        }
    }
    if (result.length > 0) {
        res.json(result);
    } else {
        res.status(404).send('No books found by that author');
    }
});

// Task 4: Get book details based on the title
public_users.get('/title/:title', function (req, res) {
    const title = req.params.title;
    const result = [];
    for (const bookId in books) {
        if (books[bookId].title === title) {
            result.push(books[bookId]);
        }
    }
    if (result.length > 0) {
        res.json(result);
    } else {
        res.status(404).send('No books found with that title');
    }
});

// Task 5: Get book reviews
public_users.get('/review/:isbn', function (req, res) {
    const isbn = req.params.isbn;
    const book = books[isbn];
    if (book && book.reviews) {
        res.json(book.reviews);
    } else {
        res.status(404).send('Book or reviews not found');
    }
});

module.exports.general = public_users;
