import Assignment from '../../../models/assignment'

const showRoute = async (req, res) => {

  const assignment = await Assignment.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('id', req.params.id)
  }).fetch({
    transacting: req.trx
  })

  if(!assignment) return res.status(404).respond({
    code: 404,
    message: 'Unable to load assignment'
  })

  res.status(200).respond(assignment, {
    fields: [
      'option_id'
    ]
  })

}

export default showRoute
