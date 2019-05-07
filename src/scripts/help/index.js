import '../../web/core/services/environment'
import buildHelp from './help'
import path from 'path'

const devRoot = path.resolve()

buildHelp(devRoot).then(process.exit)
