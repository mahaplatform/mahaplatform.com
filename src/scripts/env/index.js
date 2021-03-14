import path from 'path'
import env from './env'

const environment = async (args) => {
  const root = path.resolve('.')
  await env(root, args[0])
}

export default environment
