import { playGame } from "../../engine/engine"
import { screenChangeEvent } from "../events/screen-change.event"

export const changePage = (page) => {

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
  
  function vmPlayElListener () {
    changePage('gameplay')
    playGame()
    document.dispatchEvent(screenChangeEvent)
  }

  function vmquitElListener () {
    changePage('home')
    document.dispatchEvent(screenChangeEvent)
  }
  
  export const setViewManager = () => {
    const playEl = document.querySelector('.play-game')
    const quitEls = document.querySelectorAll('.quit-game')
    
    playEl.addEventListener('click', vmPlayElListener)
  
    quitEls.forEach(quitEl => quitEl.addEventListener('click', vmquitElListener))

  }
