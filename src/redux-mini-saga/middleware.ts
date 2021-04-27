import channel from './channel'
import proc from './proc'

function createSagaMiddleware() {
  let _store

  const sagaMiddleware = store => {
    _store = store

    return next => action => {
      next(action)
      const { type, ...payload } = action
      channel.put(type, payload);
    }
  }

  sagaMiddleware.run = (saga) => {
    const iterator = saga()
    proc.call(_store, iterator)
  }

  return sagaMiddleware
}

export default createSagaMiddleware