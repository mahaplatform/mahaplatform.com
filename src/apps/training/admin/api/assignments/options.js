import OptionSerializer from '@apps/training/serializers/option_serializer'
import Assignment from '@apps/training/models/assignment'

const listRoute = async (req, res) => {

  const assignment = await Assignment.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('id', req.params.id)
  }).fetch({
    withRelated: ['assigning.options.trainings'],
    transacting: req.trx
  })

  if(!assignment) return res.status(404).respond({
    code: 404,
    message: 'Unable to load assignment'
  })

  res.status(200).respond(assignment.related('assigning').related('options'), OptionSerializer)

}

export default listRoute
