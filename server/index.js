const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const { getReposByUsername } = require('../helpers/github.js');

let app = express();

app.use(express.static(__dirname + '/../client/dist'));
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/repos', function(req, res) {
  // save the repo information in the database
  let callback = repos => {
    var results = repos.map(repo => {
      const {
        id,
        name,
        owner,
        private,
        forks,
        language,
        description,
        url,
        updated_at
      } = repo;
      const result = {
        id,
        name,
        owner,
        private,
        forks,
        language,
        description,
        url,
        updated_at
      };
      return result;
    });
    console.log('Repos from GitHub: ', results, results.length);
    return results;
  };

  var repos = getReposByUsername(req.body.query, callback);
});

app.get('/repos', function(req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});
