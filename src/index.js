import React, { Component } from 'react';
import {render} from 'react-dom';
// import { createStore } from 'redux'


let pers = {
  health: 0,
  maxhealth: 0,
  mana: 0,
  maxmana: 0,
  atk: 1,
  str: 0,
  int: 0,
};

let baseskelet = {
	health: 50,
	atk: 1,
}

let startpoints = 10;

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
	      <button id="pointbtnstr" onClick={this.addStr.bind(this)}>Добавить очки в силу</button>
	      <button id="pointbtnint" onClick={this.addInt.bind(this)}>Добавить очки в интеллект</button>
	    </div>
      );
    let p = this.state.count;
    let pcurr = this.state.health;
    pers.health = pcurr;
    return (
        <div>
	          <p>Стартовое здоровье: {pers.health} / {pers.maxhealth = this.state.maxhealth}</p>
	          <p>Стартовое Мана: {pers.mana = this.state.mana} / {pers.maxmana = this.state.mana} </p>
	          <p>Стартовая Атака: {pers.atk = this.props.atk}</p>
	          <p>Стартовое Сила: {pers.str = this.state.str}</p>
	          <p>Стартовое Интеллект: {pers.int = this.state.int}</p>
	          <p> Стартовые очки: {startpoints = this.state.count} </p>
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
		if (this.props.points === 0) {
			if (this.state.isNewGame === true) {
				New = (
					<div>
						<p>Очки распределены!</p> 
						<button onClick={this.NewGame.bind(this)}>Начать новую игру</button>
						<Skeletons chars={this.props.chars} skeleton={baseskelet} statschild={this.props.statschild.bind(this)}/>
					</div>
					)
			} else {
				New = (
					<div>
						<p>Очки распределены!</p> 
						<button onClick={this.NewGame.bind(this)}>Начать новую игру</button>
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
 			isDeath: false,
 		}
 	}

 	skattack() {
 		pers.health = pers.health - 1;
 		let currhealth = pers.health;
 		this.props.statschild(currhealth);
 		console.log(pers)
 	}

 	render() {
 		return(
 				<div>
	 				<p>Создан скелет с {this.state.skhealth} здороьем, и  {this.state.skatk} атакой. Он наносит Вам  
	 				 {" "} {this.state.skatk}  урона в секунду.
	 				</p> 
 				</div>
 			)
 	}
}


function intervalRender() {
  if (startpoints === 0) {
  	console.log('12321');
  }
}




 render(
    <Pers />,
    document.getElementById('root')
  );