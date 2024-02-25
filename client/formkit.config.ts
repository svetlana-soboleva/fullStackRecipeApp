import { rootClasses } from './formkit.theme'
import { createMultiStepPlugin } from '@formkit/addons'
import { defaultConfig } from '@formkit/vue'

export default defaultConfig({
  plugins: [createMultiStepPlugin()],
  config: {
    rootClasses,
  },
})
