import { isEffect } from './util'
import effectRunnerMap from './effectRunnerMap'
import { Store } from '@reduxjs/toolkit'

export default function (this: Store, iterator: Iterator<any, any, any>) {
  const store = this

  function next(err?: Error, pre?: any) {
    let temp
    if (err) {
      temp = iterator.throw?.(err)
    } else {
      temp = iterator.next(pre)
    }
    if (temp?.done) {
      return
    }
    const value = temp?.value
    if (isEffect(value)) {
      const runner = effectRunnerMap[value.type]
      runner?.(value as any, next, store)
    } else {
      next(undefined, value)
    }
  }

  next()
}
