import { Taker } from './types'

function channel() {
  const takers: Taker[] = []

  function take(taker: Taker) {
    takers.push(taker)
  }

  function put(pattern: string, args: any) {
    if (pattern.length === 0) {
      return
    }
    let pos = -1
    for (let i = pattern.length - 1; i >= 0; i--) {
      if (takers[i].pattern === pattern) {
        pos = i
        break
      }
    }
    if (pos >= 0) {
      takers[pos].cb.call(null, args)
      takers.splice(pos, 1)
    }
  }

  return {
    take,
    put,
  }
}

export default channel()
