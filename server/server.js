const express = require('express');
const path = require('path');
const questions = require('./questions');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, '..', 'dist')));

app.get('/api/questions', (req, res) => {
  res.json(questions);
});

app.listen(port);
