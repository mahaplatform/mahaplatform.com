import { encode } from '../../../../../core/services/jwt'
import Form from '../../../models/form'
import { readFile } from './utils'
import path from 'path'
import ejs from 'ejs'

const showRoute = async (req, res) => {

  const template = await readFile(path.join('crm','embedded','index.html'))

  const form = await Form.query(qb => {
    qb.select('crm_forms.*','crm_form_responses.num_responses')
    qb.innerJoin('crm_form_responses','crm_form_responses.form_id','crm_forms.id')
    qb.where('crm_forms.code', req.params.code)
  }).fetch({
    withRelated: ['program.logo','team.logo'],
    transacting: req.trx
  })

  const { limits } = form.get('config')
  const { strategy, redirect } = limits
  if(!form.get('is_open') && strategy === 'redirect') {
    return res.redirect(301, redirect)
  }

  const program = form.related('program')
  const team = form.related('team')
  const content = ejs.render(template, {
    form: {
      isOpen: form.get('is_open'),
      title: form.get('title'),
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
    },
    token: encode({ code: form.get('code') }, 60 * 30)
  })

  res.status(200).send(content)

}

export default showRoute
