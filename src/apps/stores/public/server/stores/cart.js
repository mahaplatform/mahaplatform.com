import { readFile } from '../utils'
import path from 'path'
import ejs from 'ejs'

const cartRoute = async (req, res) => {

  const template = await readFile(path.join('stores','cart','index.html'))

  const content = ejs.render(template, {
    code: req.params.code
  })

  res.status(200).send(content)

}

export default cartRoute
