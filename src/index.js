import React, { Component } from 'react';
import {render} from 'react-dom';
// import { createStore } from 'redux'
import styles from './index.css'

let pers = {
  health: 0,
  maxhealth: 0,
  mana: 0,
  maxmana: 0,
  atk: 1,
  str: 0,
  int: 0,
};


function baseskelet(h, a) {
	this.health = h,
	this.atk = a,
	this.isDeath = false
}

let startpoints = 10;
let skeletcount = 0;

class Pers extends Component {
  render() {

    return (
      <div>
        <Startpoints atk={pers.atk}  health={pers.health} mana={pers.mana} str={pers.str} int={pers.int} start={startpoints}/>
      </div>
    );

  }

}

class Startpoints extends Component {
  constructor() {
        super(...arguments);
        this.state = {
          count: this.props.start,
          health: this.props.health,
          maxhealth: this.props.health,
          mana: this.props.mana,
          str: this.props.str,
          int: this.props.int,
          atk: this.props.atk,
        }
    };

  addStr(e) {
    if (this.state.count < 1) {
        console.log('Недостаточно очков!');
    } else {
      this.setState({
         count: this.state.count - 1, 
         health: this.state.health + 20,
         maxhealth: this.state.health + 20,
         str: this.state.str + 1,
      });
    }
  }

  addInt(e) {
  	if (this.state.count < 1) {
        console.log('Недостаточно очков!');
    } else {
      this.setState({
         count: this.state.count - 1, 
         health: this.state.health + 10,
         maxhealth: this.state.health + 10,
         mana: this.state.mana + 10,
         int: this.state.int + 1,
      });
    }
  }

  statschild(stats) {
  	this.setState({
  		health: stats,
  	});
  }
    

  render () {
    let button = (
    	<div>
	      <button id="pointbtnstr" className="btn btn-primary" onClick={this.addStr.bind(this)}>Добавить очки в силу</button>
	      <button id="pointbtnint" className="btn btn-primary" onClick={this.addInt.bind(this)}>Добавить очки в интеллект</button>
	    </div>
      );
    let p = this.state.count;
    let pcurr = this.state.health;
    pers.health = pcurr;
    return (
        <div>
	          <p><b>Здоровье:</b> {pers.health} / {pers.maxhealth = this.state.maxhealth}</p>
	          <ProgressBar type={pers.health} /> 
	          <p><b>Мана:</b> {pers.mana = this.state.mana} / {pers.maxmana = this.state.mana} </p>
	          <p><b>Атака:</b> {pers.atk = this.props.atk}</p>
	          <p><b>Сила:</b> {pers.str = this.state.str}</p>
	          <p><b>Интеллект:</b> {pers.int = this.state.int}</p>
	          <p><b>Очки:</b> {startpoints = this.state.count} </p>
	        {button}
	        <NewGame chars={pers} points={p} statschild={this.statschild.bind(this)}/>
        </div>
      )
  }
}


class NewGame extends Component {
  	constructor() {
        super(...arguments);
        this.state = {
        	isNewGame: false,
        }
    };

    NewGame() {
  	this.setState({
  		isNewGame: true,
  	});
    }

	render() {
		let New;
		let newskelet = new baseskelet(10, 1)
		if (this.props.points === 0) {
			if (this.state.isNewGame === true) {
				New = (
					<div>
						<p>Очки распределены!</p> 
						<button  className="btn btn-primary" onClick={this.NewGame.bind(this)}>Начать новую игру</button>
						<Skeletons chars={this.props.chars} skeleton={newskelet} statschild={this.props.statschild.bind(this)}/>
					</div>
					)
			} else {
				New = (
					<div>
						<p>Очки распределены!</p> 
						<button  className="btn btn-primary" onClick={this.NewGame.bind(this)}>Начать новую игру</button>
					</div>
					)
			}
		}
		return (
			<div>{New}</div>
			)
	}
} 

class Skeletons extends Component {
 	constructor() {
 		super(...arguments)
 		this.state = {
 			skhealth: this.props.skeleton.health,
 			skatk: this.props.skeleton.atk,
 			youratk: this.props.chars.atk,
 			isDeath: false,
 		}
 	}

 	skattack() {
 		if (this.state.skhealth > 1 && pers.health > 1) {
	 		pers.health = pers.health - this.state.skatk;
	 		let currhealth = pers.health;
	 		this.props.statschild(currhealth);
 		} else {
 			pers.health = pers.health;
 			let currhealth = pers.health;
 			this.props.statschild(currhealth);
 		}


 	}

 	youratk() {
 		if (this.state.skhealth > 1) {
	 		this.setState({
	 			skhealth: this.state.skhealth - 1,
	 		})
 		} else {
 			this.setState({
 				skhealth: this.state.skhealth,
 				isDeath: true,
 			})
 			skeletcount = skeletcount + 1;
 		}
 	}

 	intervalfunc() {
 		var interval = setInterval(this.skattack.bind(this), 100)
 	}

 	makenewskelet() {
 		let newskelet = new baseskelet(10,1)
 		this.setState({
 			skhealth: newskelet.health,
 			skatk: newskelet.atk,
 			isDeath: false,
 		})
 	}

 	increaseSkeletcount () {
 		skeletcount = skeletcount + 1
 	}


 	componentDidMount() {
 		this.intervalfunc()
 	}


 	render() {
 		let skeletonDies;
 		if (this.state.isDeath === false) {
 			skeletonDies = (
 					<div><p>Создан скелет. Здоровье скелета {this.state.skhealth}, и  {this.state.skatk*10} атака. Он наносит Вам  
	 				 {" "} {this.state.skatk*10}  урона в секунду.
	 				</p> 
	 				<button className="btn btn-danger" onClick={this.youratk.bind(this)}>Атаковать скелета силой атаки: {this.state.youratk}</button></div>
 				)
 		} else {
 			skeletonDies = (
 					<div><p> Скелет убит! Позравляю! Склеетов убито {skeletcount}</p> <br /><br /><button  className="btn btn-primary" onClick={this.makenewskelet.bind(this)}>Вызвать следующего скелета</button></div>
 				)
 		} 

 		if (pers.health < 2) {
 			skeletonDies = (
 					<div><p>Вас Убили!</p> </div>
 				)
 		}
 		return(
 				<div>
	 				{skeletonDies}
 				</div>
 			)
 	}
}

class ProgressBar extends Component {
	constructor() {
		super(...arguments)
	}

	render() {
		let progstyle = {
			width: this.props.type,
		}
		return(
			<div className="progress">
				 <div className="progress-bar" role="progressbar" style={progstyle} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
			</div>
			)
	}
}

 render(
    <Pers />,
    document.getElementById('root')
  );