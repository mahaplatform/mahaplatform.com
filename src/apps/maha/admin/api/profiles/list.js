import ProfileSerializer from '../../../serializers/profile_serializer'
import Profile from '../../../models/profile'

const listRoute = async (req, res) => {

  const profiles = await Profile.filterFetch({
    scope: (qb) => {
      qb.where('team_id', req.team.get('id'))
      qb.where('user_id', req.user.get('id'))
      qb.orderByRaw('created_at asc')
    },
    filter: {
      params: req.query.$filter,
      allowed: ['type']
    },
    page: req.query.$page,
    withRelated: ['source','photo'],
    transacting: req.trx
  })

  res.status(200).respond(profiles, ProfileSerializer)

}

export default listRoute
