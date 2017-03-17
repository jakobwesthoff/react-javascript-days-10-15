import fs from 'fs';

export class RepositoryGateway {
  getRepositories() {
    return new Promise((resolve, reject) => {
      fs.readFile(`${__dirname}/../../../Data/repos.json`, 'utf-8', (error, data) => {
        if (error) {
          return reject(error);
        }
        resolve(JSON.parse(data));
      });
    });
  }
}
