import channel from './channel'
import { TakeEffect, PutEffect, CallEffect, NextFunc } from './types'
import { Store } from '@reduxjs/toolkit'
import { isPromise, isGenerator } from './util'

function runTakeEffect({ pattern }: TakeEffect, next: NextFunc) {
  channel.take({
    pattern,
    cb: (args: any) => next(undefined, args),
  })
}

function runPutEffect({ action }: PutEffect, next: NextFunc, store: Store) {
  const { dispatch } = store
  dispatch(action)
  next()
}

function runCallEffect({ fn, args }: CallEffect, next: NextFunc) {
  const fnRet = fn(...args)
  if (isPromise(fnRet)) {
    fnRet
      .then((value) => next(undefined, value))
      .catch((err) => next(err, undefined))
  } else if (isGenerator(fnRet)) {
    // todo: generator function
    next()
  } else {
    next(undefined, fnRet)
  }
}

export default {
  take: runTakeEffect,
  put: runPutEffect,
  call: runCallEffect,
}
