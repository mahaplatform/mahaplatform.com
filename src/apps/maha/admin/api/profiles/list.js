import ProfileSerializer from '@apps/maha/serializers/profile_serializer'
import Profile from '@apps/maha/models/profile'

const listRoute = async (req, res) => {

  const profiles = await Profile.filterFetch({
    scope: (qb) => {
      qb.where('account_id', req.account.get('id'))
      qb.orderByRaw('created_at asc')
    },
    filter: {
      params: req.query.$filter,
      allowed: ['type']
    },
    page: req.query.$page,
    withRelated: ['photo'],
    transacting: req.trx
  })

  await res.status(200).respond(profiles, ProfileSerializer)

}

export default listRoute
