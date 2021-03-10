import Trip from '@apps/finance/models/trip'

const editRoute = async (req, res) => {

  const trip = await Trip.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('id', req.params.id)
  }).fetch({
    withRelated: ['user','project','expense_type'],
    transacting: req.trx
  })

  if(!trip) return res.status(404).respond({
    code: 404,
    message: 'Unable to load trip'
  })

  await res.status(200).respond(trip, {
    fields: [
      'id',
      'date',
      'description',
      'project_id',
      'expense_type_id',
      'time_leaving',
      'time_arriving',
      'odometer_start',
      'odometer_end',
      'total_miles',
      'mileage_rate',
      'amount',
      'status'
    ]
  })

}

export default editRoute
