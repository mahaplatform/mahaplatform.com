import { createUserToken } from '../../../../../core/utils/user_tokens'
import { Strategy as GoogleStrategy } from 'passport-google-oauth20'
import socket from '../../../../../core/services/routes/emitter'
import { Strategy as SAMLStrategy } from 'passport-saml'
import LDAPStrategy from 'passport-ldapauth'
import Team from '../../../models/team'
import User from '../../../models/user'
import passport from 'passport'
import express from 'express'
import path from 'path'

const team = async (req, res, next) => {

  if(!req.query.state) throw new Error({
    code: 500,
    message: 'unable to load state'
  })

  const state = JSON.parse(Buffer.from(req.query.state, 'base64'))

  req.signin_id = state.signin_id

  req.team_id = state.team_id

  req.team = await Team.query(qb => {
    qb.where('id', state.team_id)
  }).fetch({
    transacting: req.trx
  })

  next()

}

const cornell = async (req, res, next) => {

  const state = getState(req)

  passport.use(new SAMLStrategy({
    cert: process.env.CORNELL_CERT,
    issuer: process.env.CORNELL_ISSUER,
    entryPoint: process.env.CORNELL_ENTRY_POINT,
    path: `/admin/auth/cornell?state=${state}`,
    acceptedClockSkewMs: 300000
  }, (profile, done) => {
    loadUserByEmail(req, profile.email, done)
  }))

  passport.authenticate('saml', {
    session: false
  }, result(req, res))(req, res, next)

}

const google = async (req, res, next) => {

  const state = getState(req)

  passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    authorizationURL: `https://accounts.google.com/o/oauth2/v2/auth?state=${state}`,
    callbackURL: `${process.env.WEB_HOST}/admin/auth/google`
  }, (accessToken, refreshToken, profile, done) => {
    loadUserByEmail(req, profile.emails[0].value, done)
  }))

  passport.authenticate('google', {
    scope: ['profile','email'],
    session: false
  }, result(req, res))(req, res, next)

}

const ldap = (req, res, next) => {

  passport.use(new LDAPStrategy({
    url: 'ldap://0.0.0.0:1389',
    base: 'o=example',
    search: {
      filter: '(&(l=Seattle)(email=*@foo.com))'
    }
  }, (req, user, done) => {
    loadUserByEmail(req, user.email, done)
  }))

  passport.authenticate('ldapauth', {
    session: false
  }, result(req, res))(req, res, next)

}

const loadUserByEmail = async (req, email, done) => {

  const user = await User.scope({
    team: req.team
  }).query(qb => {
    qb.where('email', email)
  }).fetch({
    withRelated: ['photo','team.logo'],
    transacting: req.trx
  })

  if(!user) return done(null, false, { message: 'cannot find user' })

  return done(null, user)

}

const getState = (req) => {
  return new Buffer(JSON.stringify({
    team_id: req.team_id,
    signin_id: req.signin_id
  })).toString('base64')
}

const result = (req, res) => async (err, user, info) => {

  console.log(err, user, info)

  if(!user) await failure(req, res)

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

  res.render('success')

}

const failure = async (req, res) => {

  res.render('success')

}

const server = express()

server.set('views', path.join(__dirname))

server.set('view engine', 'ejs')

server.get('/cornell', team, cornell)

server.post('/cornell', team, cornell)

server.get('/google', team, google)

server.get('/ldap', team, ldap)

export default server
