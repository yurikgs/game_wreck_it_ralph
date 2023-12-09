  // start / pause / stop game

import { moveEnemy } from "./gameplay"
import { setGamePlay } from "./listeners"
import { pauseAllSounds, playMainSong } from "./sounds"
import { pauseStopWatch, returnStopWatch } from "./stopwatch"

  
  export function initGame(state) {
    setGamePlay(state)
    playMainSong(state)
    moveEnemy(state)
  }
  
  export function pauseGame(state) {
    pauseAllSounds(state)
    pauseStopWatch(state)
    clearInterval(state.values.hitBoxTimer)
    state.values.hitBoxTimer = null
  }
  
  export function continueGame(state) {
    playMainSong(state)
    returnStopWatch(state)
    moveEnemy(state)
  }
  
  export function stopGame(state) {
    handleQuitGame(state)
  }




  export function handleEndGame(state) {
    resetGameValuesMantainSome(state)
  }
  export function handleQuitGame(state) {
    resetGameValues(state)
  }
  
  export function resetGameValues(state) {
    state.view.lifes.innerText=`x${state.values.defaults.initialLifesQuantity}`
    state.view.score.innerHTML=0
    state.view.timeLeft.innerText=0
    state.values.hits=0
    state.values.speed=state.values.defaults.initialSpeed
    clearInterval(state.values.hitBoxTimer)
    clearInterval(state.values.mainTimer)
  }
  
  export function resetGameValuesMantainSome(state) {
    state.view.lifes.innerText=`x${state.values.defaults.initialLifesQuantity}`
    state.view.timeLeft.innerText=0
    state.values.hits=0
    state.values.speed=state.values.defaults.initialSpeed
    clearInterval(state.values.hitBoxTimer)
    clearInterval(state.values.mainTimer)
  }
  