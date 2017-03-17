import {Dispatcher} from '../MinimalFlux/Dispatcher';

export const repositoriesUpdated = (newRepositories) => Dispatcher.dispatch({
  actionType: 'REPOSITORIES_UPDATED',
  repositories: newRepositories,
});

export const repositoriesReload = () => Dispatcher.dispatch({
  actionType: 'REPOSITORIES_RELOAD',
});
