import Store from '../../../models/store'
import { readFile } from '../utils'
import path from 'path'
import ejs from 'ejs'

const cartRoute = async (req, res) => {

  const store = await Store.query(qb => {
    qb.where('code', req.params.code)
  }).fetch({
    transacting: req.trx
  })

  const template = await readFile(path.join('stores','cart','index.html'))

  const content = ejs.render(template, {
    store: {
      code: store.get('code'),
      title: store.get('title')
    }
  })

  res.status(200).send(content)

}

export default cartRoute
