import React, { Component } from 'react';
import {render} from 'react-dom';
// import { createStore } from 'redux'
import styles from './index.css'
import Shop from './Shop.js';
import Spells from './Spells.js';
import ProgressBar from './ProgressBar.js'
import Game from './Game.js'

var pers = {
  health: 0,
  maxhealth: 0,
  mana: 0,
  maxmana: 0,
  atk: 1,
  str: 0,
  int: 0,
  gold: 0,
};



function baseskelet(h, a) {
	this.health = h,
	this.atk = a,
	this.isDeath = false
}

var startpoints = 10;
var skeletcount = 0;
var cost = 0;
var costcount = 0;
var atkcost = 1;
 
export {pers};
export {cost};
export {costcount};
export {skeletcount};
export {baseskelet};
export {atkcost};
export function costcountinc() {
  costcount = costcount + skeletcount*2;
}
export function healthinc(amount) {
  pers.health = pers.health + amount;
}

export function manainc(amount) {
  pers.mana = pers.mana + amount;
}


export function skattackinc(amount) {
  pers.health = pers.health - amount;
}

export function skeletcostinc() {
  cost = 10 + costcount;
}

export function skeletcountinc() {
  skeletcount = skeletcount + 1;
}

export function persgoldinc(amount) {
  pers.gold = pers.gold - amount;
}

export function persatkinc(amount) {
  pers.atk =  pers.atk + amount;
}

class Pers extends Component {

  render() {
    return (
      <div>
        <Startpoints atk={pers.atk}  
        health={pers.health} 
        mana={pers.mana}
        maxmana={pers.maxmana}
        str={pers.str} 
        int={pers.int} 
        start={startpoints}
        gold={pers.gold}/>
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
          maxmana: this.props.maxmana,
          str: this.props.str,
          int: this.props.int,
          atk: this.props.atk,
          gold: pers.gold,
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
         mana: this.state.mana + 3,
         maxmana: this.state.maxmana + 3,
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
         maxmana: this.state.maxmana + 10,
         int: this.state.int + 1,
      });
    }
  }

  statschild(statsh) {
  	this.setState({
  		health: statsh,
  	});
  }

  statsmana(statsm) {
    this.setState({
      mana: statsm,
    });
  }
  
  statsgold(statsg) {
    this.setState({
      gold: statsg,
    });
  }

  statsmaxh(statsh) {
    this.setState({
      maxhealth: statsh,
    });
  }

  statsmaxm(statsm) {
    this.setState({
      maxmana: statsm,
    });
  }

  statsatk(statsa) {
    this.setState({
      atk: statsa,
    });    
  }

  render () {
    let button = (
    	<div>
	      <button id="pointbtnstr" 
        className="btn btn-primary" 
        onClick={this.addStr.bind(this)}>Добавить очки в силу 
        </button>

	      <button id="pointbtnint" 
        className="btn btn-primary" 
        onClick={this.addInt.bind(this)}>Добавить очки в интеллект
        </button>

	    </div>
      );
    let p = this.state.count;
    let pcurr = this.state.health;
    pers.health = pcurr;
    let mcurr = this.state.mana;
    pers.mana = mcurr;
    let goldcurr = skeletcount*5;
    return (
        <div className="game-wrapper">
            <div className="col-lg-3 col-md-3 col-sm-12 col-xs-12">
              {button}
              <NewGame chars={pers} points={p} 
              statschild={this.statschild.bind(this)}
              statsmana={this.statsmana.bind(this)}
              statsgold={this.statsgold.bind(this)} 
              addStr={this.addStr.bind(this)}
              statsmaxh={this.statsmaxh.bind(this)} 
              statsmaxm={this.statsmaxm.bind(this)} 
              statsatk={this.statsatk.bind(this)} />
            </div>

            <div className="col-lg-9 col-md-9 col-sm-12 col-xs-12">
              <FAQ />

  	          <p><b>Здоровье:</b> {pers.health} / {pers.maxhealth = this.state.maxhealth}</p>
  	          <ProgressBar type={pers.health} max={pers.maxhealth}/> 
  	          <p><b>Мана:</b> {pers.mana = this.state.mana} / {pers.maxmana = this.state.maxmana} </p>
              <ProgressBar type={pers.mana} max={pers.maxmana}/> 
  	          <p><b>Атака:</b> {pers.atk = this.state.atk}</p>
  	          <p><b>Сила:</b> {pers.str = this.state.str}</p>
  	          <p><b>Интеллект:</b> {pers.int = this.state.int}</p>
  	          <p><b>Очки:</b> {startpoints = this.state.count} </p>
              <p><b>Золото:</b> {pers.gold = this.state.gold} </p>
              
            </div>

        </div>
      )
  }
} 

class FAQ extends Component {
  constructor() {
    super(...arguments)
    this.state = {
      isFAQopen: false,
    }
  }

  isFAQ() {
    this.setState({
      isFAQopen: !this.state.isFAQopen,
    });
  }

  render() {
    let tooltipText;
      if (this.state.isFAQopen){
        tooltipText =  (
        <div className="tooltipText">
          Суть игры: убивать скелетов и прокачивать персонажа.<br />
          В начале есть 10 очков для распределения по статам: либо в силу, либо в интеллект.<br />
          Каждое очко силы прибавляет <b>+20 к здоровью, +3 к мане.</b> <br />
          Каждое очко интеллекта <b>+10 здоровья +10 маны.</b> <br /> 
          От этих параметров также зависит дальнешее увеличение здоровья и маны. <br /><br />
          Затем будет предложено начать игру и атаковать скелетов. За каждого скелета вы будете получать <b>золото.</b><br />
          Вне боя со скелетами вы можете посетить <b>магазин</b>, а также включится <b>реген здоровья и маны</b>, 
          который можно ускорить заклинанием <b>восстановление</b><br />
          Смерть наступает, если ваше здоровье опускается до нуля.

        </div>
      );
      } else {
        tooltipText = (
            <div className="tooltipText"></div>
          )
      }

    return(
      <div className="tooltip">
        <p className="FAQ"><span onClick={this.isFAQ.bind(this)}>F.A.Q по игре</span></p>
        {tooltipText}
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
    let newskeleth = 10 + skeletcount;
    let newskeletm = 1 + skeletcount*0.1;
		let newskelet = new baseskelet(newskeleth, newskeletm)
		if (this.props.points === 0) {
			if (this.state.isNewGame === true) {
				New = (
					<div>
						<p>Очки распределены!</p> 
						<button  className="btn btn-primary" 
            			onClick={this.NewGame.bind(this)}>Начать новую игру</button>
						<Game chars={this.props.chars} skeleton={newskelet} 
			            statschild={this.props.statschild.bind(this)}
			            statsmana={this.props.statsmana.bind(this)} 
			            statsgold={this.props.statsgold.bind(this)}
			            addStr={this.props.addStr.bind(this)} 
			            statsmaxh={this.props.statsmaxh.bind(this)} 
			            statsmaxm={this.props.statsmaxm.bind(this)} 
			            statsatk={this.props.statsatk.bind(this)} />
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


 render(
    <Pers />,
    document.getElementById('root')
  );
