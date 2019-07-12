import redis from '../../../../../core/services/redis'
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

  const token = new Buffer(`${username}:${password}`).toString('base64')

  const user_id = await redis.getAsync(`dav:${token}`)

  if(user.get('id') === parseInt(user_id)) return callback(true, user)

  const authenticated = user ? user.authenticate(password) : false

  if(authenticated) {
    await redis.setAsync(`dav:${token}`, user.get('id'), 'EX', 60 * 5)
  }

  callback(authenticated, user)

}

const basic = auth.connect(auth.basic({
  realm: 'MAHA'
}, loadUser))

const authentication = (req, res, next) => {
  return basic(req, res, next)
}

export default authentication
