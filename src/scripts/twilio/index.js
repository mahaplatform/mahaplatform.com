import '@core/services/environment'
import publish from './publish'
import test from './test'

const processor = async () => {

  const args = process.argv.slice(2)

  if(args[0] === 'publish') await publish(args[1])

  if(args[0] === 'test') await test()

}

processor().then(process.exit)
