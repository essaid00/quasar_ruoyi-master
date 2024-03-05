import { boot } from 'quasar/wrappers'
import {useDict} from 'src/utils/dict'
import modal from 'src/plugins/modal'
import tab from 'src/plugins/tab'

export default ({ app }) => {
  app.config.globalProperties.useDict = useDict
  app.config.globalProperties.$modal = modal
  app.config.globalProperties.$tab = tab
}
