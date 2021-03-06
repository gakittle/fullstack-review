const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const { getReposByUsername } = require('../helpers/github.js');
const { save, get, Repo } = require('../database/index.js');

let app = express();

app.use(express.static(__dirname + '/../client/dist'));
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/repos', function(req, res) {
  // save the repo information in the database
  let callback = repos => {
    if (Array.isArray(repos)) {
      var results = repos.map(repo => {
        const { id, name, html_url, updated_at } = repo;
        owner_id = repo.owner.id;
        owner_login = repo.owner.login;
        const result = {
          id,
          name,
          owner_id,
          owner_login,
          html_url,
          updated_at
        };
        return result;
      });
      // console.log('Repos from GitHub: ', results, results.length);
      save(results);
    }
    res.sendStatus(201);
  };

  var repos = getReposByUsername(req.body.query, callback);
});

app.get('/repos', function(req, res) {
  console.log('req', req.query);

  Repo.find({})
    .sort('-updated_at')
    .exec((err, repos) => {
      if (err) {
        console.error(err);
      }
      res.send(repos.slice(0, 25));
    });
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});
