import '@core/services/environment'
import log from '@core/utils/log'
import env from '../env/env'
import path from 'path'

const dist = path.resolve('dist')

const staged = `${dist}.staged`

const buildEnv = async(environment) => {
  log('info', 'environment', 'Compiling...')
  await env(path.join(staged), environment)
  log('info', 'environment', 'Compiled successfully.')
}

export default buildEnv
