import React from "react";
import ReactDOM from "react-dom";
import {RepositoryListApp} from "./Containers/RepositoryListApp";
import {RepositoryGateway} from './Gateways/RepositoryGateway';
import {repositoriesUpdated} from './Actions/Repository';

import "../Styles/reset.css";
import "../Styles/app.scss";
import "font-awesome/css/font-awesome.css"
import "bootstrap/dist/css/bootstrap.css"

ReactDOM.render(
  <RepositoryListApp />,
  document.getElementById('root')
);
