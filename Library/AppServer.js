import express from 'express';
import serveStatic from 'serve-static';
import fs from 'fs';
import path from 'path';

import React from "react";
import ReactDOMServer from "react-dom/server";
import {RepositoryListApp} from "./Containers/RepositoryListApp";

import {GatewayRegistry} from "./Gateways/GatewayRegistry";
import {RepositoryGateway} from "./Gateways/Server/RepositoryGateway";

import {StoreRegistry} from "./Stores/StoreRegistry";
import {RepositoryStore} from "./Stores/RepositoryStore";

GatewayRegistry.set("Repository", new RepositoryGateway());
StoreRegistry.set("Repository", new RepositoryStore());
      
const indexTemplate = fs.readFileSync(`${__dirname}/../index.html`, 'utf-8');

const renderIndex = (request, response, next) => {
  if (request.path !== '/' && request.path !== '/index.html') {
    return next();
  }

  const renderedApplication = ReactDOMServer.renderToString(
    <RepositoryListApp />
  );
  
  Promise.resolve()
    .then(() => StoreRegistry.initializeAll())
    .then(() => StoreRegistry.dehydrateAll())
    .then(dehydrations => {
      const indexContent = indexTemplate
      .replace(
        '<div id="root"></div>',
        `<div id="root">${renderedApplication}</div>`
      )
      .replace(
        '<!-- Hydration -->',
        `<script>${dehydrations.join("\n")}</script>`
      )
      
      response.end(indexContent);
    });
};

const app = express();

const publicPath = path.resolve(`${__dirname}/../Distribution`);
console.log(`Serving from: ${publicPath}`);
app.use(renderIndex);
app.use(serveStatic(publicPath));

app.listen(9090);
console.log('Server running on port 8080');
