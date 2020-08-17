import { readFile } from '../utils'
import path from 'path'
import ejs from 'ejs'

const checkoutRoute = async (req, res) => {

  const template = await readFile(path.join('stores','checkout','index.html'))

  const content = ejs.render(template, {
    store: {
      code: req.params.code,
      title: 'Maha Store'
    },
    token: 'abc123'
  })

  res.status(200).send(content)

}

export default checkoutRoute
