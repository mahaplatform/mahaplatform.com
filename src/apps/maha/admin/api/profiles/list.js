import ProfileSerializer from '../../../serializers/profile_serializer'
import Profile from '../../../models/profile'

const listRoute = async (req, res) => {

  const profiles = await Profile.scope(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('user_id', req.user.get('id'))
  }).query(qb => {
    qb.orderByRaw('created_at asc')
  }).filter({
    filter: req.query.$filter,
    filterParams: ['type']
  }).fetchPage({
    page: req.query.$page,
    withRelated: ['source','photo'],
    transacting: req.trx
  })

  res.status(200).respond(profiles, ProfileSerializer)

}

export default listRoute
