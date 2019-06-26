import '../web/core/services/environment'
import db from '../web/core/scripts/db/db'
import register from 'babel-register'
import fs from 'fs'

const babelrc = JSON.parse(fs.readFileSync('.babelrc'))

register(babelrc)

const processor = async () => {

  const args = process.argv.slice(2)

  await db(args[0])

}

processor().then(process.exit)
