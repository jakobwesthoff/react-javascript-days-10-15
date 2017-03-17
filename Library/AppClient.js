import React from "react";
import ReactDOM from "react-dom";
import {RepositoryListApp} from "./Containers/RepositoryListApp";

import {GatewayRegistry} from "./Gateways/GatewayRegistry";
import {RepositoryGateway} from "./Gateways/Client/RepositoryGateway";

import {StoreRegistry} from "./Stores/StoreRegistry";
import {RepositoryStore} from "./Stores/RepositoryStore";

GatewayRegistry.set("Repository", new RepositoryGateway());
StoreRegistry.set("Repository", new RepositoryStore());

import "../Styles/reset.css";
import "../Styles/app.scss";
import "font-awesome/css/font-awesome.css"
import "bootstrap/dist/css/bootstrap.css"

StoreRegistry.hydrateAll();
StoreRegistry.initializeAll()
  .then(() => {
    ReactDOM.render(
      <RepositoryListApp />,
      document.getElementById('root')
    );
  });

