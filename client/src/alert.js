import React, { Component } from 'react';
import '../styles/alert.css';

export default class Alert extends Component {

  constructor(props) {
  super(props);
    this.state = {};
  }

  goToAlert = (e) => {
    this.props.showNewAlert()
  }


  render() {
    return(
      <div onClick={this.goToAlert} className="alert slideAlert">
        <div className="alertContent">
          <img alt="login Icon" className="alertIcon" src="./alertUser.svg" />
          {/* <h3>{this.props.alert.title}</h3>
          <h3>{this.props.alert.content}</h3> */}
          <span className="alertT">{this.props.alert.title}</span> <br/>
          <span className="alertQ">{this.props.alert.content}</span>
        </div>
      </div>
    )
  }
}
