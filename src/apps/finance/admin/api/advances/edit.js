import Advance from '@apps/finance/models/advance'

const editRoute = async (req, res) => {

  const advance = await Advance.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('id', req.params.id)
  }).fetch({
    withRelated: ['user','project','expense_type','status'],
    transacting: req.trx
  })

  if(!advance) return res.status(404).respond({
    code: 404,
    message: 'Unable to load advance'
  })

  await res.status(200).respond(advance, {
    fields: [
      'id',
      'date',
      'description',
      'amount',
      'status',
      'project_id',
      'expense_type_id'
    ]
  })

}

export default editRoute
