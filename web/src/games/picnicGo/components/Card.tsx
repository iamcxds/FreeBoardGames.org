import * as React from 'react';
import { cardEnum } from '../types';
import css from './stylesheet.module.css';

import cardSandwichChicken from './media/cardSandwichChicken.png';
import cardSandwichPork from './media/cardSandwichPork.png';
import cardSandwichBeef from './media/cardSandwichBeef.png';
import cardChipsPotato1 from './media/cardChipsPotato1.png';
import cardChipsPotato2 from './media/cardChipsPotato2.png';
import cardChipsPotato3 from './media/cardChipsPotato3.png';
import cardDeviledEggs from './media/cardDeviledEggs.png';
import cardFriedChicken from './media/cardFriedChicken.png';
import cardPizza from './media/cardPizza.png';
import cardFork from './media/cardFork.png';
import cardMayo from './media/cardMayo.png';
import cardCupcake from './media/cardCupcake.png';

interface InnerWrapper {
  id: cardEnum;
  active: boolean;
  selected: boolean;
  isTurn: boolean;
}

export function getCardImage(id: cardEnum) {
  let image: any;
  switch (id) {
    case cardEnum.sandwichChicken:
      image = cardSandwichChicken;
      break;
    case cardEnum.sandwichPork:
      image = cardSandwichPork;
      break;
    case cardEnum.sandwichBeef:
      image = cardSandwichBeef;
      break;
    case cardEnum.chipsPotato1:
      image = cardChipsPotato1;
      break;
    case cardEnum.chipsPotato2:
      image = cardChipsPotato2;
      break;
    case cardEnum.chipsPotato3:
      image = cardChipsPotato3;
      break;
    case cardEnum.deviledEggs:
      image = cardDeviledEggs;
      break;
    case cardEnum.friedChicken:
      image = cardFriedChicken;
      break;
    case cardEnum.pizza:
      image = cardPizza;
      break;
    case cardEnum.fork:
      image = cardFork;
      break;
    case cardEnum.mayo:
      image = cardMayo;
      break;
    case cardEnum.cake:
      image = cardCupcake;
      break;
  }
  return image;
}

export class Card extends React.Component<InnerWrapper, {}> {
  render() {
    let cardImage: any = getCardImage(this.props.id);

    return (
      <div className={this.props.active ? css.Card : css.CardSmall}>
        <img
          src={cardImage}
          style={{
            opacity: this._getOpacity(),
            transform: !this.props.active || this.props.selected ? 'none' : 'scale(0.85)',
          }}
        />
      </div>
    );
  }

  _getOpacity() {
    if (!this.props.active || this.props.isTurn || this.props.selected) return 1.0;
    else return 0.75;
  }
}