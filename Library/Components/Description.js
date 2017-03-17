import React, {PropTypes, Component} from 'react';

export class Description extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      isCollapsed: true,
      ellipsisIsNeeded: props.children.length > props.ellipsis,
    };
  }
  
  onDescriptionClick = () => {
    this.setState(
      state => ({isCollapsed: !state.isCollapsed})
    );
  };
  
  render() {
    const {ellipsisIsNeeded, isCollapsed} = this.state;
    const {ellipsis, children: description} = this.props;
    
    if (!ellipsisIsNeeded) {
      return (
        <p className="description">
          {description}
        </p>
      );
    }
    
    let ellipsisText = description;
    let classNames = "description";
    if (isCollapsed) {
      ellipsisText = description.substr(0, ellipsis) + '…';
      classNames = "description collapsed";
    }
    
    return (
      <p className={classNames} onClick={this.onDescriptionClick}>
        {ellipsisText}
      </p>
    );
  }
}

Description.propTypes = {
  children: PropTypes.string.isRequired,
  ellipsis: PropTypes.number,
};

Description.defaultProps = {
  ellipsis: Number.Infinity
}
