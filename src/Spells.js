import React, { Component } from 'react';
import {render} from 'react-dom';
import {pers} from './index.js';
import {cost} from './index.js';
import {costcount, healthinc} from './index.js';



class Spells extends Component {

  castRes() {
    let lowhp = pers.maxhealth - pers.health;
    let hptoincrease = Math.round(lowhp*0.5);
    if ((lowhp > 5) && (pers.mana >= 15)) {
      //pers.health = pers.health + hptoincrease;
      healthinc(hptoincrease);
      let mana = pers.mana - 15;
      this.props.statsmana(mana);
      this.props.statschild(pers.health);
      
    }
  }

  render() {
    return (
    <div>
      <div><button  className="btn btn-primary" onClick={this.castRes.bind(this)}>Восстановление</button>
      <div className="tooltip">?
          <span className="tooltiptext">Восстановление половины <b>затраченного здоровья</b>. Стоимость 15 маны.</span>
        </div>
      </div>
    </div>
    )
  }
}

export default Spells;
