import path from 'path'
import fs from 'fs'

const swPath = path.resolve(__dirname,'..','..','..','public','sw.js')

const swMiddleware = async (req, res) => {

  const data = fs.readFileSync(swPath, 'utf8')

  res.type('application/javascript').send(data)

}

export default swMiddleware
