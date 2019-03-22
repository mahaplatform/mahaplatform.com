import server from './server'
import presence from './presence'
import collectObjects from '../../utils/collect_objects'

export default async (io, socket) => {

  const sockets = collectObjects('admin/socket.js')

  await server(io, socket)

  await presence(io, socket)

  await Promise.map(sockets, async socketFile => {

    const handler = socketFile.default

    await handler(io, socket)

  })

}
