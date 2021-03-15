import '../../services/environment'
import bootstrap from './bootstrap'

const processor = async () => {
  await bootstrap()
}

processor().then(process.exit)
