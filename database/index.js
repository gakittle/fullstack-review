const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

var db = mongoose.connection;
db.on('error', () => console.error('Error: '));
db.once('open', () => {
  console.log('mongodb connected!');
});

let repoSchema = mongoose.Schema({
  id: String,
  name: String,
  owner_id: Number,
  owner_login: String,
  private: String,
  forks: Number,
  language: String,
  description: String,
  url: String,
  updated_at: Date
});

let Repo = mongoose.model('Repo', repoSchema);

let save = repoData => {
  repoData.forEach(repo => {
    console.log('Saving repo: ', repo);
    var newRepo = new Repo(repo);
    newRepo.save((err, newRepo) => {
      if (err) {
        console.error('Error: ', err);
      } else {
        console.log('stored Repo: ', newRepo);
      }
    });
  });
};

module.exports.save = save;
