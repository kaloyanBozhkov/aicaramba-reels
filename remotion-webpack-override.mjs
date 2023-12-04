import path from 'path'

import { enableTailwind } from '@remotion/tailwind'

export const webpackOverride = (currentConfiguration) => {
 const withTailwind = enableTailwind(currentConfiguration)

 return {
  ...withTailwind,
  resolve: {
   ...withTailwind.resolve,
   alias: {
    ...(withTailwind.resolve?.alias ?? {}),
    '@': path.resolve('./src'),
   },
  },
 }
}
