import { IGameCtx } from 'boardgame.io/core';

import { ICard, IHand, IHint, IG} from './interfaces';
import { isWin, isEnd, isLose } from './endconditions';
import { idToColor, idToValue } from './util';

import { moveDiscard, moveHintColor, moveHintValue, movePlay } from './moves';

// Setup
function setup(ctx: IGameCtx): IG {
  // Create Deck
  var deckindex = 49
  var deck = Array(50).fill(null)
  for (var i = 0; i < 50; i++) {
    deck[i] = <ICard> {
      id: i,
      color: idToColor(i),
      value: idToValue(i),
    }
  }
  var deck = ctx.random.Shuffle(deck)
  var piles: ICard[][] = Array(5).fill(null)
  for ( var i = 0; i < 5; i++) {
    piles[i] = Array(0)
  }
  var trash: ICard[] = Array(0)

  // Create Player Hands
  var nrCards: number
  if ( ( ctx.numPlayers === 2 ) || ( ctx.numPlayers === 3 ) ){
    nrCards = 5
  } else { // 4 or 5 players
    nrCards = 4 
  }
  var hands = Array(ctx.numPlayers).fill(null)

  for (var j = 0; j < ctx.numPlayers; j++ ) {
    hands[j] = <IHand> { player: j,
                         cards: Array(nrCards).fill(null),
                         hints: Array(nrCards).fill(null)}
    for (var i = 0; i < nrCards; i++) {
      hands[j].cards[i] = deck[deckindex]
      deckindex -= 1
      hands[j].hints[i] = <IHint> { color: [0,0,0,0,0], value: [0,0,0,0,0]} 
    }
  }


  // Rest
  var countdown = 3
  var treats = 8


  var finalG = <IG> {
    deck: deck,
    deckindex: deckindex,
    trash: trash,
    piles: piles,
    hands: hands, 
    countdown: countdown ,
    treats: treats,
  }


  return finalG
}


// Game
export const ZooParadeGame = {
  name: 'zooparade',

  setup: setup,

  playerView: (G, ctx, playerID) => {
    // Hide your own cards
    var id = parseInt(playerID) 

    if (isNaN(id)) { // However, if this is not a multiplayer then this is NaN. 
            //     // For testing only, as this game can only be played Multiplayer.
      console.log(playerID)

      return G
    }

    return {
      ...G,
      deck: G.deck.map((value, index) => { return null}),
      hands: G.hands.map((hand: IHand, index: number) => {
            if (index !== id) {
              return hand
            }
            return <IHand> {
              cards: hand.cards.map((card: ICard,  index_card: number) => {return null}),
              hints: hand.hints,
              player: hand.player
            }
      })
    }
  },


  moves: {
  //  movePlay,
  //  moveDiscard,
  //  moveHintColor,
  //  moveHintValue,
    movePlay: {
      move: movePlay,
      client: false
    },
    moveDiscard: {
      move: moveDiscard,
      client: false
    },
    moveHintColor: {
      move: moveHintColor,
      client: false
    },
    moveHintValue: {
      move: moveHintValue,
      client: false
    },
  },

  turn: { moveLimit: 1 },

  endIf: (G, ctx) => {
    if (isLose(G)) {
      return { winner: ctx.currentPlayer }; // TODO: RETURN THE SCORE
    }
    if (isWin(G)) {
      return { draw: true }; // TODO: RETURN THE SCORE
    }
    if (isEnd(G, ctx)) {
      return { draw: true }; // TODO: RETURN THE SCORE
    }
  },
};

