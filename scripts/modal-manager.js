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