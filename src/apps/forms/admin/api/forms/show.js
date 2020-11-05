import FormSerializer from '@apps/forms/serializers/form_serializer'
import Form from '@apps/forms/models/form'

const showRoute = async (req, res) => {

  const form = await Form.query(qb => {
    qb.select('crm_forms.*','crm_form_totals.*')
    qb.innerJoin('crm_form_totals','crm_form_totals.form_id','crm_forms.id')
    qb.where('team_id', req.team.get('id'))
    qb.where('id', req.params.id)
  }).fetch({
    withRelated: ['program.bank','workflow'],
    transacting: req.trx
  })

  if(!form) return res.status(404).respond({
    code: 404,
    message: 'Unable to load form'
  })

  res.status(200).respond(form, FormSerializer)

}

export default showRoute
