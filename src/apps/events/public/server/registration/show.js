import { readFile } from '../utils'
import path from 'path'
import ejs from 'ejs'

const showRoute = async (req, res) => {

  const template = await readFile(path.join('events','registration','index.html'))

  const content = ejs.render(template, {})

  res.status(200).send(content)


}

export default showRoute
