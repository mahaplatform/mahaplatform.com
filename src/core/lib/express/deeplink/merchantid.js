import path from 'path'
import fs from 'fs'

const merchantid = fs.readFileSync(path.join(__dirname, 'apple-developer-merchantid-domain-association.txt'), 'utf8')

const merchantidRoute = async (req, res) => {

  res.status(200).type('text/plain').send(merchantid)

}

export default merchantidRoute
