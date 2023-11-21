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