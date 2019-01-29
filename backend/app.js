const express = require('express');
const parser = require('body-parser');
const mongoose = require('mongoose');

const dbPass = 'dlugopis';

const connectionAddress = `mongodb+srv://shiro:${dbPass}@anime-cluster-1-armvd.mongodb.net/anime-library?retryWrites=true`;

// Data models
const Anime = require('./models/anime');

const app = express();

mongoose.connect(connectionAddress, {useNewUrlParser: true})
  .then(() => {
    console.log('Connection to db established successfull!');
  })
  .catch((error) => {
    console.log('Connection to db failed!', error);
  });

// Middleware to return valid json data
app.use(parser.json());
app.use(parser.urlencoded({extended: false}));

app.use((req, res, next) => {
  // Header set to avoid CORS issues
  res.setHeader('Access-Control-Allow-Origin', '*');

  res.setHeader('Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept');

  // Header show allowed methods
  res.setHeader('Access-Control-Allow-Methods',
    'GET, POST, PATCH, DELETE, OPTIONS');
  next();
});

app.post('/api/anime/add', (req, res, next) => {
  const post = new Anime({
    title: req.body.title,
    description: req.body.description,
    releaseDate: req.body.releaseDate,
    studio: req.body.studio,
    genre: req.body.genre
  });
  post.save();
  res.status(201).json({
    message: 'Anime added!',
    success: true
  });
});

app.get('/api/anime/list', (req, res, next) => {
  Anime.find()
    .then(animeResp => {
      res.status(200).json(animeResp)
    })
    .catch(error => {
      console.log(error);
    });
});

app.delete('/api/anime/delete/:id', (req, res, next) => {
  Anime.deleteOne({_id: req.params.id})
    .then(result => {
      console.log(result);
      res.status(201).json({
        message: 'Anime deleted!',
        success: true
      });
    })
    .catch(error => {
      console.log(error);
    });
});

module.exports = app;
