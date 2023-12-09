export function debouncer(el, time) {

  let interval
  let timeToBLink = time??450 
  let currentTime = 0
  let gap = 15

  interval = setInterval( () => {
    currentTime+=gap
    el.style.opacity= '.8'

    blink(el)
    if(currentTime>=timeToBLink) {
      resetElProps(el)
      clearInterval(interval)
    }

  }, gap)

}

function blink(el) {
  el.classList.toggle('background-image-none')
}

function resetElProps(el) {
  el.classList.remove('background-image-none')
  el.style.opacity= '1'
}