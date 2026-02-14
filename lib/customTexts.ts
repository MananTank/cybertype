// IndexedDB helper for storing custom texts using idb-keyval
import { get, set, del, keys } from 'idb-keyval'

const KEY_PREFIX = 'customText:'

export type CustomText = {
  name: string
  words: string[]
  createdAt: number
}

function getKey(name: string): string {
  return `${KEY_PREFIX}${name}`
}

export async function saveCustomText(name: string, text: string): Promise<void> {
  const words = text.split(/\s+/).filter(w => w.length > 0)

  const customText: CustomText = {
    name,
    words,
    createdAt: Date.now()
  }

  await set(getKey(name), customText)
}

export async function getCustomText(name: string): Promise<CustomText | undefined> {
  return get<CustomText>(getKey(name))
}

export async function getAllCustomTexts(): Promise<CustomText[]> {
  const allKeys = await keys<string>()
  const customTextKeys = allKeys.filter(k => k.startsWith(KEY_PREFIX))

  const texts = await Promise.all(customTextKeys.map(k => get<CustomText>(k)))

  return texts.filter((t): t is CustomText => t !== undefined)
}

export async function deleteCustomText(name: string): Promise<void> {
  await del(getKey(name))
}

export async function customTextExists(name: string): Promise<boolean> {
  const text = await getCustomText(name)
  return text !== undefined
}
