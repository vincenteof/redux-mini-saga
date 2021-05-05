import channel from './channel'
import {
  TakeEffect,
  PutEffect,
  CallEffect,
  ForkEffect,
  NextFunc,
  TakeEveryEffect,
} from './types'
import { Store } from '@reduxjs/toolkit'
import { isPromise, isGenerator } from './util'
import proc from './proc'

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
    // todo: error handling
    let temp = fnRet.next()
    while (!temp.done) {
      temp = fnRet.next(temp.value)
    }
    next(undefined, temp.value)
  } else {
    next(undefined, fnRet)
  }
}

function runForkEffect({ fn, args }: ForkEffect, next: NextFunc, store: Store) {
  const child = fn(...args)
  if (isGenerator(child)) {
    proc.call(store, child)
  }
  next()
}

function takeEveryEffect(_: TakeEveryEffect, next: NextFunc) {
  next()
}

export default {
  take: runTakeEffect,
  put: runPutEffect,
  call: runCallEffect,
  fork: runForkEffect,
  takeEvery: takeEveryEffect,
}
