import React, {PropTypes} from 'react';
import {Description} from './Description';

export const Repository = (props) => (
  <div className="repository">
    <h3><i className="fa fa-github" aria-hidden="true"></i> <a href={props.htmlUrl}>{props.name}</a></h3>
    <dl className="dl-horizontal">
      <dt>Repository</dt>
      <dd><a href={props.repoUrl}>{props.repoUrl}</a></dd>
      <dt>Description</dt>
      <dd>
        <Description>{props.description}</Description>
      </dd>
    </dl>
  </div>
);

Repository.propTypes = {
  name: PropTypes.string.isRequired,
  repoUrl: PropTypes.string.isRequired,
  htmlUrl: PropTypes.string,
  description: PropTypes.string,
};

Repository.defaultProps = {
  htmlUrl: '#',
  description: 'No description available',
};