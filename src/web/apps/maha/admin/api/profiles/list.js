import ProfileSerializer from '../../../serializers/profile_serializer'
import Profile from '../../../models/profile'

const listRoute = async (req, res) => {

  const profiles = await Profile.scope({
    team: req.team,
    user: req.user
  }).fetchPage({
    page: req.query.$page,
    withRelated: ['source'],
    transacting: req.trx
  })

  res.status(200).respond(profiles, (profile) => {
    return ProfileSerializer(req, profile)
  })

}

export default listRoute
