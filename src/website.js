import startServer from 'next/dist/server/lib/start-server'
import path from 'path'

const processor = async () => {

  const app = await startServer({
    dir: path.resolve('src','apps','websites','template'),
    dev: true,
    isNextDevCommand: true
  }, 3000, 'localhost')

  await app.prepare()

}




processor()
