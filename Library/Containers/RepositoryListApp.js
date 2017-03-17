import React, {Component} from "react";
import {RepositoryList} from '../Components/RepositoryList';
import {RepositoryStore} from '../Stores/RepositoryStore';
import {repositoriesReload} from '../Actions/Repository';

export class RepositoryListApp extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      repositories: RepositoryStore.getRepositories(),
      repositoriesLoading: RepositoryStore.getIsLoading(),
    };
  }
  
  componentDidMount() {
      RepositoryStore.addChangeListener(this.onRepositoryChange);
  }
  
  componentWillUnmount() {
      RepositoryStore.removeChangeListener(this.onRepositoryChange);
  }
  
  onRepositoryChange = () => {
    this.setState({
      repositories: RepositoryStore.getRepositories(),
      repositoriesLoading: RepositoryStore.getIsLoading(),
    });
  }
  
  onRefreshClick = () => {
    repositoriesReload();
  }
  
  render() {
    if (this.state.repositoriesLoading) {
      return (
        <div className="container">
          <h1>List of Repositories <i className="fa fa-refresh fa-spin fa-fw"></i></h1>
        </div>
      );
    }
    
    return (
      <div className="container">
        <h1>
          List of Repositories <i className="fa fa-refresh fa-fw" onClick={this.onRefreshClick}></i>
        </h1>
        <RepositoryList repos={this.state.repositories} />
      </div>
    );
  }
}
