import { useEffect } from 'react'
import { dataNameGroups } from '../components/DataSelector'
import { soundPacks } from './sounds'
import { State } from './types'

export function getLocalStorage(
  key: string,
  defaultValue: string,
  validator: (value: string) => boolean
): string {
  if (typeof window === 'undefined') return defaultValue
  try {
    const value = localStorage.getItem(key)
    if (value === null) return defaultValue
    if (validator(value)) return value
    // fix local storage value
    setLocalStorage(key, defaultValue)
    return defaultValue
  } catch (error) {
    return defaultValue
  }
}

export function setLocalStorage(key: string, value: string) {
  try {
    localStorage.setItem(key, value)
  } catch (error) {
    console.error(error)
  }
}

// local storage value validators
// if the values stored are not consistent with latest application code, ignore it and use the default value

const validSoundPackIds = new Set(soundPacks.map(pack => pack.id)) as Set<string>

export const soundPackValidator = (str: string) => {
  return validSoundPackIds.has(str)
}

export const booleanValidator = (str: string) => {
  return str === 'false' || str === 'true'
}

const validDataNames: Set<string> = new Set()

dataNameGroups.forEach(group => {
  group.values.forEach(value => {
    validDataNames.add(value)
  })
})

export const dataNameValidator = (str: string) => {
  return validDataNames.has(str)
}

// save the state items to local storage when they are updated

export function useLocalStorage(state: State) {
  useEffect(() => {
    setLocalStorage('dataName', state.dataName)
  }, [state.dataName])

  useEffect(() => {
    setLocalStorage('soundEnabled', String(state.soundEnabled))
  }, [state.soundEnabled])

  useEffect(() => {
    setLocalStorage('soundPack', state.soundPack)
  }, [state.soundPack])
}
