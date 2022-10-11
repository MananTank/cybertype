import { useEffect } from 'react'
import { loadedData } from '../lib/state'
import { Action, State } from '../lib/types'

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

      const fileName = dataName.toLowerCase().replace(/ /g, '-')

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
