import { encode } from '../../../../../core/services/jwt'
import Email from '../../../../maha/models/email'
import Program from '../../../models/program'
import { readFile } from '../utils'
import path from 'path'
import ejs from 'ejs'

const showRoute = async (req, res) => {

  const email = await Email.query(qb => {
    qb.where('code', req.params.email_code)
  }).fetch({
    withRelated: ['email_campaign'],
    transacting: req.trx
  })

  const program = await Program.query(qb => {
    qb.where('id', email.related('email_campaign').get('program_id'))
  }).fetch({
    withRelated: ['logo','team.logo'],
    transacting: req.trx
  })

  req.team = program.related('team')

  const template = await readFile(path.join('crm','forward','index.html'))

  const content = ejs.render(template, {
    contact: {},
    form: {
      program: {
        code: program.get('code'),
        logo: program.related('logo') ? program.related('logo').get('path') : null,
        title: program.get('title')
      }
    },
    program: {
      title: program.get('title'),
      logo: program.related('logo') ? program.related('logo').get('path') : null
    },
    team: {},
    token: 'abc'
  })

  res.status(200).send(content)

}

export default showRoute
