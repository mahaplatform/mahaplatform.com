import path from 'path'
import fs from 'fs'

const filepath = path.resolve(__dirname, 'apple-developer-merchantid-domain-association.txt')

const merchantid = fs.readFileSync(filepath, 'utf8')

const merchantidRoute = async (req, res) => {

  res.status(200).type('text/plain').send(merchantid)

}

export default merchantidRoute
