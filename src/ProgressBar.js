import React, { Component } from 'react';
import {render} from 'react-dom';
import {pers} from './index.js';
import {cost} from './index.js';
import {costcount, costcountinc} from './index.js';



class ProgressBar extends Component {

  render() {
    let progstyle = {
      width: this.props.type,
    }
    let progmax = {
      width: this.props.max,
    }
    return(
      <div className="progress" style={progmax}>
         <div className="progress-bar progress-bar-success" 
         role="progressbar" 
         style={progstyle} 
         aria-valuenow="25" 
         aria-valuemin="0" 
         aria-valuemax="100"></div>
      </div>
      )
  }
}


export default ProgressBar;
