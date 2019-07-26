import ProfileSerializer from '../../../serializers/profile_serializer'
import Profile from '../../../models/profile'

const listRoute = async (req, res) => {

  const profiles = await Profile.scope({
    team: req.team
  }).query(qb => {
    qb.where('maha_profiles.user_id', req.user.get('id'))
  }).fetchPage({
    page: req.query.$page,
    withRelated: ['source'],
    transacting: req.trx
  })

  res.status(200).respond(profiles, ProfileSerializer)

}

export default listRoute
