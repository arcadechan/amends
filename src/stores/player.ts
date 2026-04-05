import { writable } from 'svelte/store'

export const activeTrackId = writable<string | null>(null)
export const isLoadingTrack = writable(false)
export const userPlayIntent = writable(false)


export const playback = writable({
  position: 0,
  duration: 0,
})