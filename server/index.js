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
        const { id, name, url, updated_at } = repo;
        owner_id = repo.owner.id;
        owner_login = repo.owner.login;
        const result = {
          id,
          name,
          owner_id,
          owner_login,
          url,
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

  Repo.find({}, (err, repos) => {
    console.log(typeof repos);
    res.json(repos);
  });
  // get(req.query, repos => {
  //   console.log('GET on out of here');
  //   res.write(repos);
  //   res.sendStatus(200);
  // });

  // TODO - your code here!
  // This route should send back the top 25 repos
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});
