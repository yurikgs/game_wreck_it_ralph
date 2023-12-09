import { setViewManager } from "./view-manager.util"

const { setModalManager } = require("./modal-manager.util")

function screenChangeListener () {
    setViewManager()
    setModalManager()
} 

export const setScreenChangeListener = () => {
  document.addEventListener('screenChange', screenChangeListener)
}