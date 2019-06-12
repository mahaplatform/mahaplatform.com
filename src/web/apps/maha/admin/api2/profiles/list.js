import ProfileSerializer from '../../../serializers/profile_serializer'
import Profile from '../../../models/profile'

const listRoute = async (req, res) => {

  const profiles = await Profile.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('user_id', req.user.get('id'))
  }).fetchPage({
    page: req.query.$page,
    withRelated: ['source'],
    transacting: req.trx
  })

  res.status(200).respond(profiles, (profile) => {
    return ProfileSerializer(req, req.trx, profile)
  })

}

export default listRoute
