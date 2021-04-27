export function take(pattern: string) {
  return {
    isEffect: true,
    type: 'take',
    pattern,
  }
}

export function put(action: any) {
  return {
    isEffect: true,
    type: 'put',
    action,
  }
}
