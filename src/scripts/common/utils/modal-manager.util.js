
const setEls = () => {

  return {
      pauseButtonEl : document.querySelector('.pause-button'),
      toQuitButtonEl : document.querySelector('.to-quit-button'),
      quitButtonEl : document.querySelector('.quit-game'),
      continueButtonEls : document.querySelectorAll('.return-button'),
      pauseToQuitButton : document.querySelector('.pause-to-quit-button'),
      pauseModalEl : document.querySelector('.pause-modal'),
      quitModalEl : document.querySelector('.quit-modal'),
  }
}

function mmPauseButtonElListener () {

  const els = setEls()
  els.pauseModalEl?.classList.toggle('invisible')
}
function mmContinueButtonElListener () {
  const els = setEls()
  if(!els.pauseModalEl?.classList.contains('invisible'))  {
    els.pauseModalEl?.classList.add('invisible')
  }
  if(!els.quitModalEl?.classList.contains('invisible')) {
    els.quitModalEl?.classList.add('invisible')
  }
}

function mmToQuitButtonElListener () {
  const els = setEls()
  els.quitModalEl?.classList.toggle('invisible')
}

function mmQuitButtonElListener () {
  const els = setEls()
  els.quitModalEl?.classList.toggle('invisible')
}

function mmPauseToQuitButtonListener () {
  const els = setEls()
  els.pauseModalEl?.classList.toggle('invisible')
  els.quitModalEl?.classList.toggle('invisible')
}

export const setModalManager = () => {
  const els = setEls()

  els.pauseButtonEl?.addEventListener('click', mmPauseButtonElListener)
  
  els.continueButtonEls?.forEach(continueButtonEl => {
    continueButtonEl.addEventListener('click', mmContinueButtonElListener)
  })
  
  els.toQuitButtonEl?.addEventListener('click', mmToQuitButtonElListener)
  
  els.quitButtonEl?.addEventListener('click', mmQuitButtonElListener)
  
  els.pauseToQuitButton?.addEventListener('click', mmPauseToQuitButtonListener)
}

