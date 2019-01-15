import { WithAutoPanel, useAutoPanel } from './api'
import config from './Config'
import * as components from './components/index'
import * as providers from './providers/index'
import './style.sass'

const AutoPanel = components.MainLayout

export {
  WithAutoPanel,
  useAutoPanel,
  config,
  components,
  providers,
  AutoPanel
}
