import { TakeEffect, PutEffect, CallEffect } from './types'
import { AnyAction } from '@reduxjs/toolkit'
import { AnyFunc } from './types'

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

export function call(fn: AnyFunc, ...args: any[]): CallEffect {
  return {
    isEffect: true,
    type: 'call',
    fn,
    args,
  }
}
