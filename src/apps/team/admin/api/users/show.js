import UserSerializer from '../../../serializers/user_serializer'
import User from '../../../../maha/models/user'

const showRoute = async (req, res) => {

  const user = await User.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('id', req.params.id)
  }).fetch({
    withRelated: ['photo','roles','groups','supervisors','user_type'],
    transacting: req.trx
  })

  if(!user) return res.status(404).respond({
    code: 404,
    message: 'Unable to load user'
  })

  res.status(200).respond(user, UserSerializer)

}

export default showRoute
