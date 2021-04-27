import { TakeEffect, PutEffect } from './types'
import { AnyAction } from '@reduxjs/toolkit'

export function take(pattern: string): TakeEffect {
  return {
    isEffect: true,
    type: 'take',
    pattern,
  }
}

export function put(action: AnyAction): PutEffect {
  return {
    isEffect: true,
    type: 'put',
    action,
  }
}
