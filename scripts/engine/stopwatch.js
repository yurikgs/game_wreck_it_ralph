import { gameOver } from "./gameplay"

export function resetStopWatch(state) {
  state.view.timeLeft.innerText=state.values.defaults.initialTime
  clearInterval(state.values.mainTimer)
  state.values.mainTimer = setInterval(() => stopWatchConfig(state), 1000)
}

export function freezeStopWatch(state) {
  state.view.timeLeft.innerText=0
  clearInterval(state.values.mainTimer)
}

export function verifyTimeLeft(state) {
  if(state.view.timeLeft.innerText==0) {
    gameOver()
  }
}

export function stopWatchConfig(state) {
  const time = parseInt(state.view.timeLeft.innerText)
  state.view.timeLeft.innerText= time-1
  verifyTimeLeft(state)
}

export function pauseStopWatch(state) {
  clearInterval(state.values.mainTimer)
}

export function returnStopWatch(state) {
  state.values.mainTimer = setInterval(() => stopWatchConfig(state), 1000)
}

export function addSecondsToStopWatch(state, sec) {
  const time = parseInt(state.view.timeLeft.innerText)
  state.view.timeLeft.innerText = time + sec
}