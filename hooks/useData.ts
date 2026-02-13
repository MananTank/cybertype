import { useEffect } from 'react'
import { allData } from '../lib/data'
import { Action, State } from '../lib/types'

export function useData(dataName: State['dataName'], dispatch: React.Dispatch<Action>) {
  useEffect(() => {
    const data = allData[dataName]
    if (data) {
      dispatch({
        type: 'setData',
        dataName: dataName,
        data: data as string[]
      })
    }
  }, [dispatch, dataName])
}
