import { encode } from '../../../../../core/services/jwt'
import Email from '../../../models/email'
import { readFile } from './utils'
import path from 'path'
import ejs from 'ejs'

const showRoute = async (req, res) => {

  const email = await Email.query(qb => {
    qb.where('code', req.params.email_code)
  }).fetch({
    withRelated: ['team.logo'],
    transacting: req.trx
  })

  req.team = email.related('team')

  const template = await readFile(path.join('maha','forward','index.html'))

  const content = ejs.render(template, {
    form: {
      code: email.get('code')
    },
    token: encode({ code: email.get('code') }, 60 * 30)
  })

  res.status(200).send(content)

}

export default showRoute
