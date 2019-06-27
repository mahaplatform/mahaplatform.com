import User from '../../../../maha/models/user'
import auth from 'http-auth'

const loadUser = async (username, password, callback, req) => {
  const user = await User.scope({
    team: req.team
  }).query(qb => {
    qb.where('email', username)
  }).fetch({
    transacting: req.trx
  })
  const authenticated = user ? user.authenticate(password) : false
  callback(authenticated, user)
}

const authentication = auth.connect(auth.basic({
  realm: 'MAHA'
}, loadUser))

export default authentication
