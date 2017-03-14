const bodyParser = require('body-parser');
const express = require('express');
const path = require('path');
const MongoClient = require('mongodb').MongoClient;
const questions = require('./questions');

const app = express();
const port = process.env.PORT || 3000;
const uri = process.env.MONGODB_URI;

app.use(express.static(path.join(__dirname, '..', 'dist')));
app.use(bodyParser.json());

app.get('/api/questions', (req, res) => {
  res.json(questions);
});

app.post('/api/track-quiz-finished', (req, res) => {
  if (!uri) {
    res.sendStatus(500).end();
    return;
  }

  MongoClient.connect(uri, (err, db) => {
    if (err) {
      res.sendStatus(503).end(); // Service not available
      return;
    }
    const quizFinishedEvents = db.collection('quiz-finished-events');
    quizFinishedEvents.insert(req.body, (error, result) => {
      if (error) {
        res.sendStatus(500).end();
        return;
      }
      res.sendStatus(200);
      res.send(result);
      res.end();
    });
  });
});

app.listen(port);
