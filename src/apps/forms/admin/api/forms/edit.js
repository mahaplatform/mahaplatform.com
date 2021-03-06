import Form from '@apps/forms/models/form'

const editRoute = async (req, res) => {

  const form = await Form.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('id', req.params.id)
  }).fetch({
    transacting: req.trx
  })

  if(!form) return res.status(404).respond({
    code: 404,
    message: 'Unable to load form'
  })

  await res.status(200).respond(form, (req, form) => ({
    title: form.get('title'),
    permalink: form.get('permalink')
  }))

}

export default editRoute
