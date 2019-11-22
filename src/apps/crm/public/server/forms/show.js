import Form from '../../../models/form'
import { readFile } from './utils'
import path from 'path'
import ejs from 'ejs'

const template = readFile(path.join('form.html'))

const showRoute = async (req, res) => {

  const form = await Form.query(qb => {
    qb.where('code', req.params.code)
  }).fetch({
    withRelated: ['program.logo','team.logo'],
    transacting: req.trx
  })

  const program = form.related('program')

  const team = form.related('team')

  const content = ejs.render(template, {
    form: {
      code: form.get('code'),
      config: {
        ...form.get('config'),
        program: {
          title: program.get('title'),
          logo: program.related('logo') ? program.related('logo').get('path') : null
        }
      }
    },
    program: {
      title: program.get('title'),
      logo: program.related('logo') ? program.related('logo').get('path') : null
    },
    team: {
      title: team.get('title'),
      logo: team.related('logo') ? team.related('logo').get('path') : null
    }
  })

  res.status(200).send(content)

}

export default showRoute
