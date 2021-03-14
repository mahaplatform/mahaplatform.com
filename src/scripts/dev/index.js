import '@core/services/environment'
import { bootstrap } from '@core/services/bootstrap/bootstrap'
import { watchDesktop, watchMobile } from './dev.platform'
import { watchFrontend, watchSdk } from './dev.frontend'
import watchBackend from './dev.backend'
import watchWeb from './dev.web'
import ngrok from 'ngrok'

const connectNgrok = async () => {
  await ngrok.connect({
    authtoken: process.env.NGROK_AUTHTOKEN,
    addr: process.env.SERVER_PORT,
    subdomain: process.env.NGROK_SUBDOMAIN,
    host_header: process.env.DOMAIN
  })
}

const includes = (a, b) => {
  return a.some(r => b.includes(r))
}

const dev = async (args) => {
  const entities = args.length > 0 ? args[0].split(',') : ['admin']
  if(includes(entities, ['admin','backend'])) await bootstrap()
  if(includes(entities, ['admin','backend'])) await connectNgrok()
  if(includes(entities, ['admin','backend'])) await watchBackend()
  if(includes(entities, ['admin','frontend'])) await watchFrontend()
  if(includes(entities, ['sdk'])) await watchSdk()
  if(includes(entities, ['mobile'])) await watchMobile()
  if(includes(entities, ['desktop'])) await watchDesktop()
  if(includes(entities, ['web'])) await watchWeb()
}

export default dev
