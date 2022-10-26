import { useEffect } from 'react'
import { loadedData } from '../lib/state'
import { Action, State } from '../lib/types'

function dataNameToFileName(dataName: string) {
  if (dataName === 'C#') return 'csharp'
  return dataName.toLowerCase().replace(/ /g, '-')
}

export function useData(dataName: State['dataName'], dispatch: React.Dispatch<Action>) {
  useEffect(() => {
    let isCancelled = false

    if (dataName in loadedData) {
      dispatch({
        type: 'setData',
        dataName: dataName,
        data: loadedData[dataName] as string[]
      })
    } else {
      dispatch({ type: 'setFetchingData', data: true })

      const fileName = dataNameToFileName(dataName)

      fetch(`/json/${fileName}.json`)
        .then(res => res.json())
        .then(data => {
          if (isCancelled) {
            // save the data but don't set it
            loadedData[dataName] = data
          } else {
            dispatch({ type: 'setFetchingData', data: false })
            dispatch({ type: 'setData', data, dataName })
          }
        })
    }

    return () => {
      isCancelled = true
    }
  }, [dispatch, dataName])
}
