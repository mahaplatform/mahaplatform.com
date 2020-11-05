import UserSerializer from '@apps/learning/serializers/user_serializer'
import User from '@apps/maha/models/user'

const showRoute = async (req, res) => {

  const user = await User.query(qb => {
    qb.where('id', req.params.id)
  }).fetch({
    withRelated: ['photo'],
    transacting: req.trx
  })

  if(!user) return res.status(404).respond({
    code: 404,
    message: 'Unable to load user'
  })

  res.status(200).respond(user, UserSerializer)

}

export default showRoute
