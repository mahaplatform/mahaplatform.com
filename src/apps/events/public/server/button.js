import { readFile } from './utils'
import path from 'path'

const embedRoute = async (req, res) => {

  const content = await readFile(path.join('events','button','js','main.js'))

  res.status(200).type('text/javascript').send(content)

}

export default embedRoute
