import '@core/services/environment'
import { bootstrap } from '@core/scripts/bootstrap/bootstrap'
import watchPlatform from './dev.platform'
import watchFrontend from './dev.frontend'
import watchBackend from './dev.backend'
import ngrok from 'ngrok'

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
  const platform = argv.length > 0 ? argv[0] : null
  await bootstrap()
  await connectNgrok()
  await watchBackend()
  await watchFrontend()
  if(platform) await watchPlatform(platform)
}

processor()
