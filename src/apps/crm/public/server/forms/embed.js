import Form from '../../../models/form'
import { readFile } from '../utils'
import path from 'path'

const embedRoute = async (req, res) => {

  const template = await readFile(path.join('crm','embed','js','main.js'))

  const form = await Form.query(qb => {
    qb.where('code', req.params.code)
  }).fetch({
    transacting: req.trx
  })

  const content = template.replace('<%= form.code %>', form.get('code'))

  res.status(200).type('text/javascript').send(content)

}

export default embedRoute
