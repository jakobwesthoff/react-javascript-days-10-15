import {Store} from '../MinimalFlux/Store';
import {Dispatcher} from '../MinimalFlux/Dispatcher';
import {repositoriesUpdated} from '../Actions/Repository';
import {RepositoryGateway} from '../Gateways/RepositoryGateway';

class RepositoryStoreImpl extends Store {
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
    
    this._reloadRepositories();
  }
  
  getRepositories() {
    return this._repositories;
  }
  
  getIsLoading() {
    return this._isLoading;
  }
  
  _reloadRepositories() {
    return RepositoryGateway.getRepositories()
      .then(repositories => repositoriesUpdated(repositories));
  }
}

export const RepositoryStore = new RepositoryStoreImpl();
