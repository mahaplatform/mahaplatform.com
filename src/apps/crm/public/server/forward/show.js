import { encode } from '../../../../../core/services/jwt'
import Program from '../../../models/program'
import { readFile } from '../utils'
import path from 'path'
import ejs from 'ejs'

const showRoute = async (req, res) => {

  const program = await Program.query(qb => {
    qb.where('id', 1)
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
