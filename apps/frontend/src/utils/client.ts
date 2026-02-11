import { hc } from 'hono/client'

import type { AppType } from '../../../packages/backend'

export const client = hc<AppType>('/')