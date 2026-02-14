import { useEffect } from 'react'
import { allData } from '../lib/data'
import { getCustomText } from '../lib/customTexts'
import { Action, State } from '../lib/types'

const DEFAULT_DATA_NAME = 'English 200'

export function useData(dataName: State['dataName'], dispatch: React.Dispatch<Action>) {
  useEffect(() => {
    // First check built-in data
    const builtInData = allData[dataName]
    if (builtInData) {
      dispatch({
        type: 'setData',
        dataName: dataName,
        data: builtInData as string[]
      })
      return
    }

    // Otherwise, check custom texts from IndexedDB
    getCustomText(dataName).then(customText => {
      if (customText) {
        dispatch({
          type: 'setData',
          dataName: dataName,
          data: customText.words
        })
      } else {
        // Custom text not found (may have been deleted), fall back to default
        dispatch({ type: 'setDataName', data: DEFAULT_DATA_NAME })
      }
    })
  }, [dispatch, dataName])
}
