import ProfileSerializer from '../../../serializers/profile_serializer'
import Profile from '../../../models/profile'

const showRoute = async (req, res) => {

  const profile = await Profile.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('id', req.params.id )
  }).fetch({
    withRelated: ['source'],
    transacting: req.trx
  })

  if(!profile) return res.status(404).json({
    code: 404,
    message: 'Unable to find profile'
  })

  res.status(200).respond(profile, ProfileSerializer)

}

export default showRoute
