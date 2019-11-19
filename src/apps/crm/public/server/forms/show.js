import Form from '../../../models/form'

const showRoute = async (req, res) => {

  const form = await Form.query(qb => {
    qb.where('code', req.params.code)
  }).fetch({
    withRelated: ['program.logo','team.logo'],
    transacting: req.trx
  })

  const program = form.related('program')

  const team = form.related('team')

  res.status(200).render('show', {
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

}

export default showRoute
