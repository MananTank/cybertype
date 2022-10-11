export const lowerCaseAlpha = [
  'a',
  'b',
  'c',
  'd',
  'e',
  'f',
  'g',
  'h',
  'i',
  'j',
  'k',
  'l',
  'm',
  'n',
  'o',
  'p',
  'q',
  'r',
  's',
  't',
  'u',
  'v',
  'w',
  'x',
  'y',
  'z'
]

export const upperCaseAlpha = lowerCaseAlpha.map(e => e.toUpperCase())

export const row1 = ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=']
export const row1Shift = ['~', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '+']

export const row2Shift = ['{', '}', `\\`] //
export const row2 = ['[', ']', '|']

export const row3 = [';', `'`]
export const row3Shift = [':', '"']

export const row4 = [',', `.`, '/']
export const row4Shift = ['<', '>', '?']

export const others = [' ', 'Enter', 'Backspace', 'ArrowLeft', 'ArrowRight']

// heat map is generated for these keys
export const heatmapKeys = [...lowerCaseAlpha, ...row2, ...row3, ...row4, ' ']

// keys that are not in this list are ignored
const keysToUse = new Set([
  ...lowerCaseAlpha,
  ...upperCaseAlpha,
  ...row1,
  ...row1Shift,
  ...row2,
  ...row2Shift,
  ...row3,
  ...row3Shift,
  ...row4,
  ...row4Shift,
  ...others
])

export function shouldIgnore(key: string) {
  return !keysToUse.has(key)
}
