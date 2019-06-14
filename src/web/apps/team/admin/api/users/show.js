import UserSerializer from '../../../serializers/user_serializer'
import User from '../../../../maha/models/user'

const showRoute = async (req, res) => {

  const user = await User.scope({
    team: req.team
  }).query(qb => {
    qb.where('id', req.params.id)
  }).fetch({
    transacting: req.trx
  })

  if(!user) return req.status(404).respond({
    code: 404,
    message: 'Unable to load user'
  })

  res.status(200).respond(user, UserSerializer)

}

export default showRoute
