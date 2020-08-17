import { readFile } from '../utils'
import path from 'path'
import ejs from 'ejs'

const cartRoute = async (req, res) => {

  const template = await readFile(path.join('stores','cart','index.html'))

  const content = ejs.render(template, {
    store: {
      code: req.params.code,
      title: 'Maha Store'
    }
  })

  res.status(200).send(content)

}

export default cartRoute
