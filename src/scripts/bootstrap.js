import '../core/services/environment'
import { bootstrap } from '../core/scripts/bootstrap/bootstrap'

const processor = async () => {

  await bootstrap()

}

processor().then(process.exit)
