import { Effect } from './types'

export function isPromise(p: any) {
  return (
    p !== undefined &&
    typeof p.then === 'function' &&
    typeof p.catch === 'function'
  )
}

export function isEffect(effect: any): effect is Effect {
  return effect !== undefined && !!effect.isEffect
}
