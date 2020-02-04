import path from 'path'
import env from './env'

const environment = async () => {

  const args = process.argv.slice(2)

  const root = path.resolve('.')

  await env(root, args[0])

}

environment().then(process.exit)
