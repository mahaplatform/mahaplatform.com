import path from 'path'
import fs from 'fs'

const data = fs.readFileSync(path.resolve(__dirname,'..','..','..','public','sw.js'), 'utf8')

const swMiddleware = async (req, res) => {

  res.type('application/javascript').send(data)

}

export default swMiddleware
