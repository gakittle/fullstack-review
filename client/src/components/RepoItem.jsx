import React from 'react';

var RepoItem = props => {
  return (
    <div className="repo">
      <a href={props.repo.html_url}>{props.repo.name}</a>
      <div className="date">
        Updated on {props.repo.updated_at.slice(0, 10)}
      </div>
      <div className="user">by {props.repo.owner_login}</div>
    </div>
  );
};

export default RepoItem;
