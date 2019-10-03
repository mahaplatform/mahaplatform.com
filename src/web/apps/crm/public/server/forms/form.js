import { readFile } from './utils'
import path from 'path'

const content = readFile(path.join('js','form.js'))

const showRoute = async (req, res) => {

  res.status(200).type('text/javascript').send(content)

}

export default showRoute
