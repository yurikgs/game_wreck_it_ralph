// listener adders

import { continueGame, pauseGame, resetGameValues, stopGame } from "./game-manager"
import { failed, hit } from "./gameplay"
import { resetStopWatch } from "./stopwatch"
 
export function addListenerHitBox(state) {
  state.view.squares.forEach((square) => {
    square.onmousedown = onMouseDownSquare.bind(null, state)
  })
}

 function onMouseDownSquare(state, event) {
    state.values.audios.effects.punch.play()
    if(event.target.id == state.values.enemySquareId) {
      hit(state, event.target.id)
    } else {
      failed(state)
    }
}

export function setPauseAndToQuitButton(state) {
  const pauseButton = document.querySelector('.pause-button')
  const toQuitButton = document.querySelector('.to-quit-button')  
  pauseButton.onclick = pauseButtonConfig.bind(null, state)
  toQuitButton.onclick = pauseGame.bind(null, state)
}

export function pauseButtonConfig(state) {
  pauseGame(state)
  setPauseToQuitButton(state)
}

export function toQuitButtonConfig(state) {
  pauseGame(state)
  setQuitButton(state)
}

export function setPauseToQuitButton(state) {
  const pauseToQuitButton = document.querySelector('.pause-to-quit-button')
  pauseToQuitButton.onclick = setQuitButton.bind(null, state)
}

export function setQuitButton(state) {
  const stopButton = document.querySelector('.quit-confirm-button')
  stopButton.onclick = stopGame.bind(null, state)
}

export function setReturnButtons(state) {
  document.querySelectorAll('.return-button').forEach(buttonEl => buttonEl.onclick = continueGame.bind(null, state))
}

function setButtons(state) {
  setPauseAndToQuitButton(state)
  setReturnButtons(state)
}

export function setGamePlay(state) {
  resetGameValues(state)
  setButtons(state)
  addListenerHitBox(state)
  resetStopWatch(state)
}