import path from 'path'
import fs from 'fs'

const revisionPath = path.join('.','REVISION')

const revision = fs.existsSync(revisionPath) ? fs.readFileSync(revisionPath, 'utf8').replace(/\n/g, '') : '0'

const middleware = async (io, socket) => {

  await new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve()
    }, 500)
  })

  socket.emit('revision', revision)

}

export default middleware
