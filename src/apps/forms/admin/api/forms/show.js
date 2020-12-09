import FormSerializer from '@apps/forms/serializers/form_serializer'
import Form from '@apps/forms/models/form'

const showRoute = async (req, res) => {

  const form = await Form.query(qb => {
    qb.select('forms_forms.*','forms_form_totals.*')
    qb.innerJoin('forms_form_totals','forms_form_totals.form_id','forms_forms.id')
    qb.where('team_id', req.team.get('id'))
    qb.where('id', req.params.id)
  }).fetch({
    withRelated: ['program.bank'],
    transacting: req.trx
  })

  if(!form) return res.status(404).respond({
    code: 404,
    message: 'Unable to load form'
  })

  res.status(200).respond(form, FormSerializer)

}

export default showRoute
