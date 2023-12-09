import { initGame } from "./game-manager"

export function playGame () {

  const state = {
    view: {
      squares: document.querySelectorAll('.square'),
      enemy: document.querySelector('.enemy'),
      timeLeft: document.querySelector('#time'),
      score: document.querySelector('#score'),
      lifes: document.querySelector('#lifes')
    },
    values: {
      defaults: {
        initialLifesQuantity: 5,
        initialSpeed: 800,
        initialTime: 30,
      },
      audios: {
        effects: {
          punch: new Audio('../sounds/punch.wav'),
          gettingHit: new Audio('../sounds/getting_hit.wav'),
          coin: new Audio('../sounds/coin.wav'),
          failure: new Audio('../sounds/mocking_failure.wav'),
          gameOver: new Audio('../sounds/game_over.wav'),
        },
        songs: {
          gameplay: new Audio('../sounds/gameplay.wav'),
        },
      },
      control : {
        isLockedPanel: false,
      },
      hitBoxTimer: null,
      mainTimer: null,
      speed: 800,
      enemySquareId: null,
      hits: 0,
    }
  }

initGame(state)

}