
// page manager

const changePage = (page) => {

  const mainEl = document.querySelector('main')
  const panelEl = document.querySelector('.panel')
  const buttonsEl = document.querySelector('.buttons')
  const introEl = document.querySelector('.intro')
  
    if(page=='home') {
      mainEl.classList.remove('gameplay')
      mainEl.classList.add('home')
      introEl.classList.remove('display-none')
      panelEl.classList.add('display-none')
      buttonsEl.classList.add('display-none')
    }
    if(page=='gameplay') {
      mainEl.classList.remove('home')
      mainEl.classList.add('gameplay')
      introEl.classList.add('display-none')
      panelEl.classList.remove('display-none')
      buttonsEl.classList.remove('display-none')
    }
  
  }
  
  const setViewManager = () => {
    const playEl = document.querySelector('.play-game')
    const quitEls = document.querySelectorAll('.quit-game')
  
    playEl.addEventListener('click', () => {
      changePage('gameplay')
    })
  
    quitEls.forEach(quitEl => quitEl.addEventListener('click', () => {
      changePage('home')
    }))
  }
  
  setViewManager()






// modal-manager



const pauseButtonEl = document.querySelector('.pause-button')
const toQuitButtonEl = document.querySelector('.to-quit-button')
const quitButtonEl = document.querySelector('.quit-game')
const continueButtonEls = document.querySelectorAll('.return-button')
const pauseToQuitButton = document.querySelector('.pause-to-quit-button')

const pauseModalEl = document.querySelector('.pause-modal')
const quitModalEl = document.querySelector('.quit-modal')

// function - game pause
// maybe I will need to import this logic from main module
function gamePauseToggle() {
  //TODO: quit game logic
  void 0;
}

function handleQuitGame() {
  // TODO: quit game logic
}

// handlers

pauseButtonEl.addEventListener('click', () => {
  gamePauseToggle()
  pauseModalEl.classList.toggle('invisible')
})

continueButtonEls.forEach(continueButtonEl => {
  continueButtonEl.addEventListener('click', () => {
    gamePauseToggle()
    if(!pauseModalEl.classList.contains('invisible'))  {
      pauseModalEl.classList.add('invisible')
    }
    if(!quitModalEl.classList.contains('invisible')) {
      quitModalEl.classList.add('invisible')
    }
  })
})

toQuitButtonEl.addEventListener('click', () => {
  gamePauseToggle()
  quitModalEl.classList.toggle('invisible')
})

quitButtonEl.addEventListener('click', () => {
  handleQuitGame()
  quitModalEl.classList.toggle('invisible')
})

pauseToQuitButton.addEventListener('click', () => {
  pauseModalEl.classList.toggle('invisible')
  quitModalEl.classList.toggle('invisible')
})



// engine



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
      initialSpeed: 900,
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
    hitBoxTimer: null,
    mainTimer: null,
    speed: 900,
    enemySquareId: null,
    hits: 0,
  }
}


function getRandomSquare() {
  state.view.squares.forEach(square => {
    square.classList.remove('enemy')
  })

  let randomNumber = Math.floor(Math.random()*9)
  let randomSquare = state.view.squares[randomNumber]
  state.values.enemySquareId = randomSquare.id

  randomSquare.classList.add('enemy')
  state.view.enemy = document.querySelector('.enemy')
}

function moveEnemy() {
  clearInterval(state.values.hitBoxTimer)
  getRandomSquare()
  state.values.hitBoxTimer = setInterval(getRandomSquare, state.values.speed)
}


async function addListenerHitBox() {
  state.view.squares.forEach(async (square) => {
    square.addEventListener('mousedown', onMouseDownSquare)
  })
}

async function onMouseDownSquare(event) {

  await state.values.audios.effects.punch.play()
  if(event.target.id == state.values.enemySquareId) {
    hit()
  } else {
    await failed()
  }
}


// Delay

function delayGame(millisec) {
  clearInterval(state.values.hitBoxTimer)
  setTimeout(moveEnemy, millisec)
}


// Success / Fail Functions


function hit() {
  // aqumentar o tempo
  addSecondsToStopWatch(3)
  // aumentar a pontuação
  const initialScore = parseInt(state.view.score.innerText)
  const newScore = initialScore+10
  state.view.score.innerText = newScore
  delayGame(900)
  // disparar o som
  state.values.audios.effects.gettingHit.play()
  state.values.audios.effects.coin.play()
  // verificar numero de hits, para subir o nível
  state.values.hits+=1
  const newSpeed = state.values.defaults.initialSpeed-(Math.floor(state.values.hits/2)*60)
  if(newSpeed>0) {
    state.values.speed = newSpeed
  }
}

async function failed() {
  // tocar audio de failure
  // diminuir 1 vida
  const lifesQuantity = state.view.lifes.innerText.substring(1)
  const newLifesQuantity = lifesQuantity-1
  state.view.lifes.innerText = `x${newLifesQuantity}`
  
  //TODO: verificar game-over
  if(newLifesQuantity==0) {
    gameOver()
  } else {
      await state.values.audios.effects.failure.play()
      delayGame(1000)
  }
}

// criar game-over voltando pro inicio 
// TODO: criar tela de game-over










































// start / pause / stop game

function initGame() {
  setGamePlay()
  playMainSong()
  moveEnemy()
}

function pauseGame() {
  pauseAllSounds()
  pauseStopWatch()
  clearInterval(state.values.hitBoxTimer)
  state.values.hitBoxTimer = null
}

function continueGame() {
  playMainSong()
  returnStopWatch()
  moveEnemy()
}

function stopGame() {

}






function setButtons() {
  setPauseAndToQuitButton()
  setReturnButtons()
}

//HERE

function resetGameValues() {
  state.view.lifes.innerText=`x${state.values.defaults.initialLifesQuantity}`
  state.view.score.innerHTML=0
  state.values.hits=0
  state.values.speed=state.values.defaults.initialSpeed
  clearInterval(state.values.hitBoxTimer)
}

function resetGameValuesMantainSome() {
  state.view.lifes.innerText=`x${state.values.defaults.initialLifesQuantity}`
  state.values.hits=0
  state.values.speed=state.values.defaults.initialSpeed
  clearInterval(state.values.hitBoxTimer)
}

function setGamePlay() {
  setButtons()
  addListenerHitBox()
  resetGameValues()
  resetStopWatch()
}

function setPauseAndToQuitButton() {
  const pauseButton = document.querySelector('.pause-button')
  const toQuitButton = document.querySelector('.to-quit-button')




  pauseButton.addEventListener('click', pauseButtonConfig)
  toQuitButton.addEventListener('click', pauseGame)
}

function pauseButtonConfig() {
  pauseGame()
  setPauseToQuitButton()
}

function toQuitButtonConfig() {
  pauseGame()
  setQuitButton()
}

function setPauseToQuitButton() {
  const pauseToQuitButton = document.querySelector('.pause-to-quit-button')
  pauseToQuitButton.addEventListener('click', setQuitButton)
}

function setQuitButton() {
  const stopButton = document.querySelector('.quit-confirm-button')
  stopButton.addEventListener('click', stopGame)
}

function setReturnButtons() {
  document.querySelectorAll('.return-button').forEach(buttonEl => buttonEl.addEventListener('click', continueGame))
}



const startButton = document.querySelector('.play-game')

startButton.addEventListener('click', () => {
  initGame()
})



// Set stopWatch

function resetStopWatch() {
  state.view.timeLeft.innerText=state.values.defaults.initialTime
  clearInterval(state.values.mainTimer)
  state.values.mainTimer = setInterval(stopWatchConfig, 1000)
}

function freezeStopWatch() {
  state.view.timeLeft.innerText=0
  clearInterval(state.values.mainTimer)
}

function verifyTimeLeft() {
  if(state.view.timeLeft.innerText==0) {
    gameOver()
  }
}

function stopWatchConfig() {
  const time = parseInt(state.view.timeLeft.innerText)
  console.log(state.view.timeLeft.innerText)
  state.view.timeLeft.innerText= time-1
  verifyTimeLeft()
}

function addSecondsToStopWatch(sec) {
  const time = parseInt(state.view.timeLeft.innerText)
  state.view.timeLeft.innerText = time + sec
}


function pauseStopWatch() {
  clearInterval(state.values.mainTimer)
}

function returnStopWatch() {
  state.values.mainTimer = setInterval(stopWatchConfig, 1000)
}




// Game Over

// tocar música no início
function playMainSong() {
  // delete state.values.audios.songs.gameplay
  // state.values.audios.songs.gameplay = new Audio('../sounds/gameplay.wav')
  // state.values.audios.songs.gameplay.muted=true
  state.values.audios.songs.gameplay.loop = true
  state.values.audios.songs.gameplay.volume = 0.5
  state.values.audios.songs.gameplay.play()
}


function stopAllSounds() {
  for(const audio of Object.values(state.values.audios.effects)) {
    audio.pause()
    audio.currentTime=0
  }
  for(const audio of Object.values(state.values.audios.songs)) {
    audio.pause()
    audio.currentTime=0
  }
}
function pauseAllSounds() {
  for(const audio of Object.values(state.values.audios.effects)) {
    audio.pause()
  }
  for(const audio of Object.values(state.values.audios.songs)) {
    audio.pause()
  }
}

async function gameOver() {
  handleQuitGame()
  stopAllSounds()
  state.values.audios.effects.gameOver.play()
  changePage('home')
  freezeStopWatch()
}


function handleQuitGame() {
  resetGameValuesMantainSome()
}

quitButtonEl.addEventListener('click', () => {
  handleQuitGame()
})

