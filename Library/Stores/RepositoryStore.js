import {Store} from '../MinimalFlux/Store';
import {Dispatcher} from '../MinimalFlux/Dispatcher';
import {repositoriesUpdated} from '../Actions/Repository';
import {GatewayRegistry} from '../Gateways/GatewayRegistry';

export class RepositoryStore extends Store {
  static HYDRATION_KEY = "RepositoryStore";
  
  _repositories = [];
  _isLoading = true;
  
  constructor() {
    super();
    Dispatcher.register(action => {
      switch(action.actionType) {
        case 'REPOSITORIES_UPDATED':
          this._repositories = action.repositories;
          this._isLoading = false;
          this.emitChange();
        break;
        case 'REPOSITORIES_RELOAD':
          this._isLoading = true;
          this._reloadRepositories();
          this.emitChange();
        break;
      }
    });
  }
  
  _initialize() {
    return Promise.all([
      this._reloadRepositories(),
    ]);
  }
  
  getRepositories() {
    return this._repositories;
  }
  
  getIsLoading() {
    return this._isLoading;
  }
  
  _reloadRepositories() {
    const repositoryGateway = GatewayRegistry.get('Repository');
    return repositoryGateway.getRepositories()
      .then(repositories => repositoriesUpdated(repositories));
  }
  
  _getDehydrationProperties() {
    return [
      '_repositories',
      '_isLoading',
    ];
  }
}
