import { AnyAction } from '@reduxjs/toolkit'

export type Taker = {
  pattern: string
  cb: Function
}

export type Saga = GeneratorFunction

export type AnyFunc = (...args: any[]) => any

export type EffectType = 'take' | 'put' | 'call' | 'fork' | 'takeEvery'

export type EffectBase = {
  isEffect: true
  type: EffectType
}

export type TakeEffect = EffectBase & {
  type: 'take'
  pattern: string
}

export type PutEffect = EffectBase & {
  type: 'put'
  action: AnyAction
}

export type CallEffect = EffectBase & {
  type: 'call'
  fn: AnyFunc
  args: any[]
}

export type ForkEffect = EffectBase & {
  type: 'fork'
  fn: AnyFunc
  args: any[]
}

export type TakeEveryEffect = EffectBase & {
  type: 'takeEvery'
  pattern: string
  saga: Saga
}

export type NextFunc = (err?: Error, pre?: any) => void

export type Effect =
  | TakeEffect
  | PutEffect
  | CallEffect
  | ForkEffect
  | TakeEveryEffect
