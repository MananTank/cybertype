import {
  lowerCaseAlpha,
  row1,
  row2,
  row3,
  row1Shift,
  shouldIgnore,
  upperCaseAlpha,
  row2Shift,
  row3Shift,
  row4,
  row4Shift,
  others
} from '../lib/keys'

test('lower case keys are not ignored', () => {
  lowerCaseAlpha.forEach(ch => {
    expect(shouldIgnore(ch)).toBe(false)
  })
})

test('upper case keys are not ignored', () => {
  upperCaseAlpha.forEach(ch => {
    expect(shouldIgnore(ch)).toBe(false)
  })
})

test('row1, row2, row3, row4 keys are not ignored', () => {
  ;[...row1, ...row2, ...row3, ...row4].forEach(ch => {
    expect(shouldIgnore(ch)).toBe(false)
  })
})

test('Shift + row1, row2, and row3 keys are not ignored', () => {
  ;[...row1Shift, ...row2Shift, ...row3Shift, ...row4Shift].forEach(ch => {
    expect(shouldIgnore(ch)).toBe(false)
  })
})

// other keys
test('other keys are not ignored', () => {
  others.forEach(ch => {
    expect(shouldIgnore(ch)).toBe(false)
  })
})

const keysToIgnore = [
  'Alt',
  'AltGraph',
  'CapsLock',
  'Control',
  'Fn',
  'FnLock',
  'Hyper',
  'Meta',
  'NumLock',
  'OS',
  'ScrollLock',
  'Shift',
  'Super',
  'Symbol',
  'SymbolLock',
  'Tab',
  'Unidentified',
  'ContextMenu',
  'Escape',
  'PrintScreen',
  'Pause',
  'Insert',
  'Delete',
  'Home',
  'End',
  'PageUp',
  'PageDown',
  'ArrowUp',
  'ArrowDown'
]

test('remaining keys are ignored', () => {
  keysToIgnore.forEach(ch => {
    expect(shouldIgnore(ch)).toBe(true)
  })
})
