import { changePage } from "../common/utils/view-manager.util"
import { debouncer } from "./debouncer"
import { handleEndGame } from "./game-manager"
import { stopAllSounds } from "./sounds"
import { addSecondsToStopWatch, freezeStopWatch } from "./stopwatch"

function setRandomSquare(state) {
  state.view.squares.forEach(square => {
    square.classList.remove('enemy')
  })

  let randomNumber = Math.floor(Math.random()*9)
  let randomSquare = state.view.squares[randomNumber]
  state.values.enemySquareId = randomSquare.id

  randomSquare.classList.add('enemy')
  state.view.enemy = document.querySelector('.enemy')
}


export function moveEnemy(state) {
  unlockPanel(state)
  clearInterval(state.values.hitBoxTimer)
  setRandomSquare(state)

  state.values.hitBoxTimer = setInterval(() => {
    return setRandomSquare(state)
  }, state.values.speed)


}


// hit

export function hit(state, hitSquareId) {
  if(!state.values.control.isLockedPanel) {
  // aumentar o tempo
  addSecondsToStopWatch(state, 3)
  // aumentar a pontuação
  const initialScore = parseInt(state.view.score.innerText)
  const newScore = initialScore+10
  state.view.score.innerText = newScore
  debouncer(document.getElementById(`${hitSquareId}`))
  delayGame(state, 400)

  // disparar o som
  state.values.audios.effects.gettingHit.currentTime=0
  state.values.audios.effects.gettingHit.play()
  state.values.audios.effects.coin.play()
  // verificar numero de hits, para subir o nível
  state.values.hits+=1
  const newSpeed = state.values.defaults.initialSpeed-(Math.floor(state.values.hits/2)*60)
  if(newSpeed>0) {
    state.values.speed = newSpeed
  }

  } else {
    // disparar som de deny aqui
  }

}

// hit functions

export function delayGame(state, millisec) {
  clearInterval(state.values.hitBoxTimer)
  lockPanel(state)
  setTimeout(() => moveEnemy(state), millisec)
}

// failure

export function failed(state) {
  if(!state.values.control.isLockedPanel) {
    const lifesQuantity = state.view.lifes.innerText.substring(1)
    const newLifesQuantity = lifesQuantity-1
    state.view.lifes.innerText = `x${newLifesQuantity}`
  
    if(newLifesQuantity==0) {
      gameOver(state)
    } else {
        state.values.audios.effects.failure.currentTime=0
        state.values.audios.effects.failure.play()
    }
  } else {
    // disparar som de deny aqui
  }
}


export async function gameOver(state) {
  clearInterval(state.values.hitBoxTimer)


  handleEndGame(state)
  stopAllSounds(state)
  state.values.audios.effects.gameOver.play()
  changePage('home')
  freezeStopWatch(state)
}

export function lockPanel(state) {
  state.values.control.isLockedPanel = true;
}

export function unlockPanel (state) {
  state.values.control.isLockedPanel = false;
}

