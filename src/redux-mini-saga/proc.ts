import { isEffect } from './util'
import effectRunnerMap from './effectRunnerMap'

export default function (this: any, iterator: Iterator<any, any, any>) {
  const store = this

  function next(err?: any, pre?: any) {
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
      runner?.(value, next, store)
    } else {
      next(null, value)
    }
  }

  next()
}


