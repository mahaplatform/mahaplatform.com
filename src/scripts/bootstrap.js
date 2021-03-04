import '@core/services/environment'
import { bootstrap } from '@core/services/bootstrap/bootstrap'

const processor = async () => {

  await bootstrap()

}

processor().then(process.exit)
