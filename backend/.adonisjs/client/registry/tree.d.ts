/* eslint-disable prettier/prettier */
import type { routes } from './index.ts'

export interface ApiDefinition {
  users: {
    index: typeof routes['users.index']
    store: typeof routes['users.store']
    show: typeof routes['users.show']
    update: typeof routes['users.update']
    destroy: typeof routes['users.destroy']
  }
}
