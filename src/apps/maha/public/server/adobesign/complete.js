import { readFile } from './utils'
import path from 'path'

const completeRoute = async (req, res) => {

  const template = await readFile(path.join('maha','complete','index.html'))

  res.status(200).send(template)

}

export default completeRoute
