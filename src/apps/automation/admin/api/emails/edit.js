import Email from '@apps/automation/models/email'

const editRoute = async (req, res) => {

  const email = await Email.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('id', req.params.id)
  }).fetch({
    transacting: req.trx
  })

  if(!email) return res.status(404).respond({
    code: 404,
    message: 'Unable to load email'
  })

  res.status(200).respond(email, (req, form) => ({
    title: form.get('title')
  }))

}

export default editRoute
