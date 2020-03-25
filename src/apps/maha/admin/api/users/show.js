import UserSerializer from '../../../serializers/user_serializer'
import User from '../../../models/user'

const showRoute = async (req, res) => {

  const user = await User.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('id', req.params.id)
  }).fetch({
    withRelated: ['photo'],
    transacting: req.trx
  })

  res.status(200).respond(user, UserSerializer)

}

export default showRoute
