// sound effects

// tocar música no início
export function playMainSong(state) {
  state.values.audios.songs.gameplay.loop = true
  state.values.audios.songs.gameplay.volume = 0.5
  state.values.audios.songs.gameplay.play()
}

export function stopAllSounds(state) {
  for(const audio of Object.values(state.values.audios.effects)) {
    audio.pause()
    audio.currentTime=0
  }
  for(const audio of Object.values(state.values.audios.songs)) {
    audio.pause()
    audio.currentTime=0
  }
}
export function pauseAllSounds(state) {
  for(const audio of Object.values(state.values.audios.effects)) {
    audio.pause()
  }
  for(const audio of Object.values(state.values.audios.songs)) {
    audio.pause()
  }
}