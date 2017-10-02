import React, { Component } from 'react';
import {render} from 'react-dom';
import {pers} from './index.js';
import {cost} from './index.js';
import {costcount, skeletcount} from './index.js';
import {costcountinc, healthinc, manainc, skattackinc, skeletcostinc, skeletcountinc, baseskelet} from './index.js'
import Shop from './Shop.js';
import Spells from './Spells.js';


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
      // skeletcount = skeletcount + 1;
      skeletcountinc();
      this.props.statsgold(pers.gold + skeletcount*2);
      //cost = 10 + costcount;
      skeletcostinc();
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
      pers.mana = pers.mana + Math.round(pers.maxmana*0.02);
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
    //skeletcount = skeletcount + 1;
    skeletcountinc();
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
            statsmaxm={this.props.statsmaxm.bind(this)}
            close={this.isShopOpen.bind(this)}
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

export default Game;
