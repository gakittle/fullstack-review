import React from 'react';
import RepoItem from './RepoItem.jsx';

const RepoList = props => (
  <div>
    <h4> Repo List Component </h4>
    There are {props.repos.length} repos.
    <div>
      {props.repos.map(repo => {
        return <RepoItem repo={repo} key={repo.id} />;
      })}
    </div>
  </div>
);

export default RepoList;
