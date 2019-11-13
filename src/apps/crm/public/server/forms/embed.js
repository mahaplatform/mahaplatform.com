import Form from '../../../models/form'
import { readFile } from './utils'
import path from 'path'
import ejs from 'ejs'

const template = readFile(path.join('js','embed.js'))

const embedRoute = async (req, res) => {

  const form = await Form.query(qb => {
    qb.where('code', req.params.code)
  }).fetch({
    transacting: req.trx
  })

  const content = ejs.render(template, {
    form: {
      code: form.get('code')
    }
  })

  res.status(200).type('text/javascript').send(content)

}

export default embedRoute
