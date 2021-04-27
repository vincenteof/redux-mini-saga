import channel from './channel'
import proc from './proc'
import { Store, Dispatch, AnyAction } from '@reduxjs/toolkit'
import { Saga } from './types'

function createSagaMiddleware() {
  let _store: Store

  const sagaMiddleware = (store: Store) => {
    _store = store

    return (next: Dispatch<AnyAction>) => (action: AnyAction) => {
      next(action)
      const { type, ...payload } = action
      channel.put(type, payload)
    }
  }

  sagaMiddleware.run = (saga: Saga) => {
    const iterator = saga()
    proc.call(_store, iterator)
  }

  return sagaMiddleware
}

export default createSagaMiddleware
