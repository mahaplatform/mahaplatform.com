import Trip from '../../../models/trip'

const editRoute = async (req, res) => {

  const trip = await Trip.scope({
    team: req.team
  }).query(qb => {
    qb.where('id', req.params.id)
  }).fetch({
    withRelated: [
      'user','project','expense_type','status'
    ],
    transacting: req.trx
  })

  if(!trip) return res.status(404).respond({
    code: 404,
    message: 'Unable to load trip'
  })

  res.status(200).respond(trip, {
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
      'amount'
    ]
  })

}

export default editRoute
