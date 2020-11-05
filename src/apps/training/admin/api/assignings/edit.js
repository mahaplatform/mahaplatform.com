import Assigning from '@apps/training/models/assigning'

const editRoute = async (req, res) => {

  const assigning = await Assigning.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('id', req.params.id)
  }).fetch({
    withRelated: ['assigned_by'],
    transacting: req.trx
  })

  if(!assigning) return res.status(404).respond({
    code: 404,
    message: 'Unable to load assigning'
  })

  res.status(200).respond(assigning, {
    fields: [
      'title',
      'completed_by'
    ]
  })

}

export default editRoute
