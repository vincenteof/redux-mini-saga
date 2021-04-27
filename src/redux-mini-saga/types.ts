import { Dispatch, AnyAction } from '@reduxjs/toolkit'

export type Taker = {
  pattern: string
  cb: Function
}

export type Saga = GeneratorFunction

export type EffectType = 'take' | 'put'

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

export type NextFunc = (err?: Error, pre?: any) => void

export type Effect = TakeEffect | PutEffect
