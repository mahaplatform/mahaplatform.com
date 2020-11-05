import ProfileSerializer from '@apps/maha/serializers/profile_serializer'
import Profile from '@apps/maha/models/profile'

const showRoute = async (req, res) => {

  const profile = await Profile.query(qb => {
    qb.where('account_id', req.account.get('id'))
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
