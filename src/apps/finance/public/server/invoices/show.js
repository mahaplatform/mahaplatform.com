import Invoice from '../../../models/invoice'
import { readFile } from './utils'
import path from 'path'
import ejs from 'ejs'

const showRoute = async (req, res) => {

  const template = await readFile(path.join('finance','invoice','index.html'))

  const invoice = await Invoice.query(qb => {
    qb.where('code', req.params.code)
  }).fetch({
    withRelated: ['customer','coupon','line_items.product','payments','program.logo'],
    transacting: req.trx
  })

  if(!invoice) return res.status(404).respond({
    code: 404,
    message: 'Unable to load invoice'
  })

  const content = ejs.render(template, {
    invoice
  })

  res.status(200).send(content)

}

export default showRoute
