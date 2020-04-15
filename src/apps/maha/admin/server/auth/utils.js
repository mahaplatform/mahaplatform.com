import { createUserToken } from '../../../../../core/utils/user_tokens'
import socket from '../../../../../core/services/routes/emitter'
import User from '../../../models/user'

export const loadUserByEmail = async (req, email, done) => {

  const user = await User.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('email', email)
  }).fetch({
    withRelated: ['photo','team.logo'],
    transacting: req.trx
  })

  if(!user) return done(null, false, { message: 'cannot find user' })

  return done(null, user)

}

export const getState = (req) => {
  return new Buffer(JSON.stringify({
    team_id: req.team_id,
    signin_id: req.signin_id
  })).toString('base64')
}

export const result = (req, res) => async (err, user, info) => {

  console.log('error', err)

  if(!user) return await failure(req, res)

  req.user = user

  await success(req, res)

}

const success = async (req, res) => {

  const team = req.user.related('team')

  await socket.message(req, {
    channel: `/admin/signin/${req.signin_id}`,
    action: 'signin',
    data: {
      team: {
        id: team.get('id'),
        title: team.get('title'),
        subdomain: team.get('subdomain'),
        logo: team.related('logo') ? team.related('logo').get('url') : null,
        authentication_strategy: team.get('authentication_strategy')
      },
      token: createUserToken(req.user, 'user_id'),
      user: {
        id: req.user.get('id'),
        email: req.user.get('email'),
        full_name: req.user.get('full_name'),
        initials: req.user.get('initials'),
        photo: req.user.related('photo') ? req.user.related('photo').get('url') : null
      }

    }
  })

  res.status(200).render('success')

}

const failure = async (req, res) => {

  res.status(500).send('failed')

}
