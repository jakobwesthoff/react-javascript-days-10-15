import React, {PropTypes} from 'react';
import {Repository} from './Repository';

export const RepositoryList = (props) => {
  const repositories = props.repos.map(document => (
    <li key={document.id}>
      <Repository name={document.full_name}
                  repoUrl={document.git_url}
                  htmlUrl={document.html_url}
                  description={document.description}
      />
    </li>
  ));
  
  return (
    <ul className="respository-list">
      {repositories}
    </ul>
  );
};

RepositoryList.propTypes = {
  repos: PropTypes.arrayOf(PropTypes.object).isRequired
};
