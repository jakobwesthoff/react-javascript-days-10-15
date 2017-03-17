import React, {Component} from "react";
import {RepositoryList} from '../Components/RepositoryList';
import {StoreRegistry} from '../Stores/StoreRegistry';
import {repositoriesReload} from '../Actions/Repository';

export class RepositoryListApp extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      repositories: StoreRegistry.get('Repository').getRepositories(),
      repositoriesLoading: StoreRegistry.get('Repository').getIsLoading(),
    };
  }
  
  componentDidMount() {
      StoreRegistry.get('Repository').addChangeListener(this.onRepositoryChange);
  }
  
  componentWillUnmount() {
      StoreRegistry.get('Repository').removeChangeListener(this.onRepositoryChange);
  }
  
  onRepositoryChange = () => {
    this.setState({
      repositories: StoreRegistry.get('Repository').getRepositories(),
      repositoriesLoading: StoreRegistry.get('Repository').getIsLoading(),
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
