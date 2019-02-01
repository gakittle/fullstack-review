const request = require('request');
const config = require('../config.js');

let getReposByUsername = (user, callback) => {
  console.log('setting options');

  let options = {
    url: `https://api.github.com/users/${user}/repos`,
    headers: {
      'User-Agent': 'request',
      Authorization: `token ${config.TOKEN}`
    }
  };

  let successCb = (error, response, body) => {
    if (error) {
      console.error(error);
      return;
    } else {
      var repos = JSON.parse(body);
      callback(repos);
    }
  };

  request(options, successCb);
};

module.exports.getReposByUsername = getReposByUsername;
