import { Effect } from './types'

export function isPromise(p: any): p is Promise<any> {
  return (
    p !== undefined &&
    typeof p.then === 'function' &&
    typeof p.catch === 'function'
  )
}

export function isGenerator(obj: any): obj is Generator {
  return (
    obj && typeof obj.next === 'function' && typeof obj.throw === 'function'
  )
}

export function isEffect(effect: any): effect is Effect {
  return effect !== undefined && !!effect.isEffect
}
