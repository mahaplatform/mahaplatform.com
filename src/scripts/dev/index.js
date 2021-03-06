import '@core/services/environment'
import { bootstrap } from '@core/services/bootstrap/bootstrap'
import watchPlatform from './dev.platform'
import { watchFrontend, watchSdk } from './dev.frontend'
import watchBackend from './dev.backend'
import ngrok from 'ngrok'
import _ from 'lodash'

const connectNgrok = async () => {
  await ngrok.connect({
    authtoken: process.env.NGROK_AUTHTOKEN,
    addr: process.env.SERVER_PORT,
    subdomain: process.env.NGROK_SUBDOMAIN,
    host_header: process.env.DOMAIN
  })
}

const processor = async () => {
  const argv = process.argv.slice(2)
  const entities = argv.length > 0 ? argv[0].split(',') : ['backend','frontend']
  await bootstrap()
  await connectNgrok()
  if(_.includes(entities,'backend')) await watchBackend()
  if(_.includes(entities,'frontend')) await watchFrontend()
  if(_.includes(entities,'sdk')) await watchSdk()
  if(_.includes(entities,'mobile')) await watchPlatform('mobile')
  if(_.includes(entities,'desktop')) await watchPlatform('desktop')
}

processor()
