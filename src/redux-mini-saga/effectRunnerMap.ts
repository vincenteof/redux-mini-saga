import channel from './channel'
import { TakeEffect, PutEffect, NextFunc } from './types'
import { Store } from '@reduxjs/toolkit'

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

export default {
  take: runTakeEffect,
  put: runPutEffect,
}
