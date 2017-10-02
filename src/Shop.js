import React, { Component } from 'react';
import {render} from 'react-dom';
import {pers} from './index.js';
import {cost} from './index.js';
import {costcount, costcountinc} from './index.js';
import Game from './Game.js'
import {persgoldinc} from './index.js'



class Shop extends Component {
  inchItem() {
    if(pers.gold > cost) {
      persgoldinc();
      this.props.statsgold(pers.gold);
      let health = Math.round(pers.maxhealth + pers.maxhealth*0.2 + pers.str*2);
      this.props.statsmaxh(health);
      costcountinc();
    }
  }

   incmItem() {
    if(pers.gold > cost) {
      persgoldinc();
      this.props.statsgold(pers.gold);
      let mana = Math.round(pers.maxmana + pers.maxmana*0.2 + pers.int*2);
      this.props.statsmaxm(mana);
      costcountinc();
    }
  }

  render() {
    return(
      <div>
        <p><b>Магазин</b></p>
        <button className="btn btn-primary"  onClick={this.inchItem.bind(this)}>Купить здоровье за {this.props.cost}</button>
        <div className="tooltip">?
          <span className="tooltiptext">Покупка здоровья увеличит его на 20% + 2*значение силы. Стоимость возрастает при каждом убитом скелете.</span>
        </div>
         <button className="btn btn-primary"  onClick={this.incmItem.bind(this)}>Купить ману за {this.props.cost}</button>
        <div className="tooltip">?
          <span className="tooltiptext">Покупка маны увеличит ее на 20% + 2*значение интеллекта. Стоимость возрастает при каждом убитом скелете.</span>
        </div>
        <button className="btn btn-primary"  onClick={this.props.close}>Выйти из магазина</button>
      </div>
    )
  }
} 

export default Shop;
