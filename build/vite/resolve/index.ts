import type { Alias } from 'vite'
import { aliasList } from './alias'
export const createAlias = (path: string) => {
  const alias: Array<Alias> = []
  for (const item of aliasList) {
    alias.push({
      find: item[0],
      replacement: path + item[1]
    })
  }
  return alias
}
