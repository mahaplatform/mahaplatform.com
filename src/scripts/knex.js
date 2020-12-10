import '../core/services/environment'
import db from '../core/scripts/db/db'

const processor = async () => {

  const args = process.argv.slice(2)

  await db(args[0])

}

processor().then(process.exit)
