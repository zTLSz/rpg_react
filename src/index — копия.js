import React, { Component } from 'react';
import {render} from 'react-dom';
// import { createStore } from 'redux'
import styles from './index.css'

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
var cost;
var costcount = 0;
 
export function exp1(c1) {
  c1 = costcount;
  return c1;
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

        <div className="tooltip">?
          <span className="tooltiptext">Каждое очко силы прибавляет +20 к здоровью. <br /><br />Каждое очко интеллекта +10 здоровья +10 маны. <br /> <br />От этих параметров также зависит дальнешее увеличение здоровья и маны.</span>
        </div>
	    </div>
      );
    let p = this.state.count;
    let pcurr = this.state.health;
    pers.health = pcurr;
    let mcurr = this.state.mana;
    pers.mana = mcurr;
    let goldcurr = skeletcount*5;
    return (
        <div>
	          <p><b>Здоровье:</b> {pers.health} / {pers.maxhealth = this.state.maxhealth}</p>
	          <ProgressBar type={pers.health} max={pers.maxhealth}/> 
	          <p><b>Мана:</b> {pers.mana = this.state.mana} / {pers.maxmana = this.state.maxmana} </p>
            <ProgressBar type={pers.mana} max={pers.maxmana}/> 
	          <p><b>Атака:</b> {pers.atk = this.props.atk}</p>
	          <p><b>Сила:</b> {pers.str = this.state.str}</p>
	          <p><b>Интеллект:</b> {pers.int = this.state.int}</p>
	          <p><b>Очки:</b> {startpoints = this.state.count} </p>
            <p><b>Золото:</b> {pers.gold = this.state.gold} </p>
	        {button}
	        <NewGame chars={pers} points={p} 
          statschild={this.statschild.bind(this)}
          statsmana={this.statsmana.bind(this)}
          statsgold={this.statsgold.bind(this)} 
          addStr={this.addStr.bind(this)}
          statsmaxh={this.statsmaxh.bind(this)} />
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
            statsmaxh={this.props.statsmaxh.bind(this)} />
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

class Game extends Component {
 	constructor() {
 		super(...arguments)
 		this.state = {
 			skhealth: this.props.skeleton.health,
 			skatk: this.props.skeleton.atk,
 			youratk: this.props.chars.atk,
 			isDeath: false,
      isShop: false,
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
      this.props.statsgold(pers.gold + skeletcount*2);
      cost = 100 + costcount;
 		}
 	}

  healthregen() {
    if ((pers.health < pers.maxhealth) && (this.state.isDeath === true)) {
      pers.health = pers.health + Math.round(pers.maxhealth*0.01);
      let currhealth = pers.health;
      this.props.statschild(currhealth);
    } else {
      pers.health = pers.health;
      let currhealth = pers.health;
      this.props.statschild(currhealth);
    }

  }

  manaregen() {
    if ((pers.mana < pers.maxmana) && (this.state.isDeath === true)) {
      pers.mana = pers.mana + Math.round(pers.maxmana*0.01);
      let currmana = pers.mana;
      this.props.statsmana(currmana);
    } else {
      pers.mana = pers.mana;
      let currmana = pers.mana;
      this.props.statsmana(currmana);
    }

  }


 	intervalfunc() {
 		var interval = setInterval(this.skattack.bind(this), 100)
    var intervalh = setInterval(this.healthregen.bind(this), 1000)
    var intervalm = setInterval(this.manaregen.bind(this), 500)
 	}

 	makenewskelet() {
    let newskeleth = Math.round(10 + skeletcount);
    let newskeletm = 1;
    let newskelet = new baseskelet(newskeleth, newskeletm)
 		this.setState({
 			skhealth: newskelet.health,
 			skatk: newskelet.atk,
 			isDeath: false,
 		})
 	}

 	increaseSkeletcount() {
 		skeletcount = skeletcount + 1;
 	}

  isShopOpen() {
    this.setState({
      isShop: !this.state.isShop,
    })
  }


 	componentDidMount() {
 		this.intervalfunc()
 	}


 	render() {
 		let skeletonDies;
    let shop;
    if (this.state.isShop) {
      shop = (
            <Shop char={pers} 
            statsmana={this.props.statsmana.bind(this)} 
            statschild={this.props.statschild.bind(this)} 
            statsgold={this.props.statsgold.bind(this)} 
            addStr={this.props.addStr.bind(this)} 
            statsmaxh={this.props.statsmaxh.bind(this)} 
            cost={cost}/>
        )
    } else {
      shop = (
          <button className="btn btn-primary" onClick={this.isShopOpen.bind(this)}>Зайти в магазин</button>
        )
    }
 		if (this.state.isDeath === false) {
 			skeletonDies = (
 					<div><p>Создан скелет. <b>Здоровье</b> скелета {this.state.skhealth}. Он наносит Вам  
	 				 {" "} {this.state.skatk*10}  урона в секунду.
	 				</p> 
	 				<button className="btn btn-danger" 
          onClick={this.youratk.bind(this)}>Атаковать скелета силой атаки: {this.state.youratk}</button></div>
 				)
 		} else {
 			skeletonDies = (
 					<div><p> Скелет убит! Позравляю! Скелетов убито {skeletcount}</p> <br /><br />
            <button  className="btn btn-primary" 
            onClick={this.makenewskelet.bind(this)}>Вызвать следующего скелета</button>
            <Spells char={pers} 
            statsmana={this.props.statsmana.bind(this)} 
            statschild={this.props.statschild.bind(this)} />
            {shop}
          </div>
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

class Spells extends Component {

  castRes() {
    let lowhp = pers.maxhealth - pers.health;
    let hptoincrease = Math.round(lowhp*0.5);
    if ((lowhp > 5) && (pers.mana >= 10)) {
      pers.health = pers.health + hptoincrease;
      let mana = pers.mana - 10;
      this.props.statsmana(mana);
      this.props.statschild(pers.health);
      
    }
  }

  render() {
    return (
    <div>
      <div><button  className="btn btn-primary" onClick={this.castRes.bind(this)}>Восстановление</button>
      <div className="tooltip">?
          <span className="tooltiptext">Восстановление половины <b>затраченного здоровья</b>. Стоимость 10 маны.</span>
        </div>
      </div>
    </div>
    )
  }
}





class Shop extends Component {
  pointItem() {
    if(pers.gold > cost) {
      pers.gold = pers.gold - cost;
      this.props.statsgold(pers.gold);
      let health = pers.maxhealth + pers.maxhealth*0.2 + pers.str*2;
      this.props.statsmaxh(health);
      costcount = cost*5;
    }
  }
  render() {
    return(
      <div>
        <button className="btn btn-primary"  onClick={this.pointItem.bind(this)}>Купить здоровье за {this.props.cost}</button>
        <div className="tooltip">?
          <span className="tooltiptext">Покупка здоровья увеличит его на 20% + 2*значение силы. Стоимость возрастает при каждом убитом скелете.</span>
        </div>
      </div>
    )
  }
} 



 render(
    <Pers />,
    document.getElementById('root')
  );