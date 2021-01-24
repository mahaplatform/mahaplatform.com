import '@core/services/environment'
import publish from './publish'
import layer from './layer'
import twiml from './twiml'

const processor = async () => {

  const args = process.argv.slice(2)

  if(args[0] === 'publish') await publish(args[1])

  if(args[0] === 'layer') await layer()

  if(args[0] === 'twiml') await twiml()

}

processor().then(process.exit)
