import User from '../../../../apps/maha/models/user'
import redis from '../../../services/redis'
import auth from 'http-auth'

const loadUser = async (username, password, callback, req) => {

  const user = await User.query(qb => {
    qb.where('team_id', req.team.get('id'))
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

const authentication = auth.connect(auth.basic({
  realm: 'MAHA'
}, loadUser))

export default authentication
