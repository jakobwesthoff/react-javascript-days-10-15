export class RepositoryGateway {
  getRepositories() {
    return fetch('/Data/repos.json')
      .then(result => result.json())
      // Artificially slow the connection by 1.5 seconds
      .then(document => new Promise(resolve => setTimeout(() => resolve(document), 1500)));
  }
}
