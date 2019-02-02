const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

var db = mongoose.connection;
db.on('error', () => console.error('Error: '));
db.once('open', () => {
  console.log('mongodb connected!');
});

let repoSchema = mongoose.Schema({
  id: Number,
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
    // search by id
    Repo.find({ id: repo.id }).then(function(oldDoc) {
      var isUpToDate;
      if (Object.keys(oldDoc).length > 0) {
        isUpToDate = true;
        // console.log('Hmm, maybe a duplicate?');
        // var oldIsoDate = oldDoc.updated_at;
        // console.log('oldDoc: ', oldDoc);
        // var oldDate = new Date(oldIsoDate).getTime();
        // var isoDate = repo.updated_at;
        // var date = new Date(isoDate).getTime();
        // console.log(oldDate, date);
        // if (oldDate === date) {
        //   console.log('Yup, thats a duplicate');
        //   isUpToDate = true;
        // }
      }
      if (!isUpToDate) {
        var newRepo = new Repo(repo);
        newRepo.save((err, newRepo) => {
          if (err) {
            console.error('Error: ', err);
          } else {
            console.log('stored repo');
          }
        });
      }
    });
    // console.log('Saving repo: ', repo);
  });
};

module.exports.save = save;
