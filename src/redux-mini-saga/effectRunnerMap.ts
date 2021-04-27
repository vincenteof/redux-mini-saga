import channel from './channel'

function runTakeEffect({ pattern }, next) {
  channel.take({
    pattern,
    cb: args => next(undefined, args)
  })
}

function runPutEffect({ action }, next, store) {
  const { dispatch } = store
  dispatch(action)
  next()
}

export default {
  take: runTakeEffect,
  put: runPutEffect,
};