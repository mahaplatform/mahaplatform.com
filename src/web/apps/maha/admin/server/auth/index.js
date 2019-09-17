import { createUserToken } from '../../../../../core/utils/user_tokens'
import { Strategy as GoogleStrategy } from 'passport-google-oauth20'
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

  req.team = await Team.query(qb => {
    qb.where('id', state.team_id)
  }).fetch({
    transacting: req.trx
  })

  next()

}

const cornell = async (req, res, next) => {

  const state = getState(req.team.get('id'))

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
  })(req, res, next)

}

const google = async (req, res, next) => {

  const state = getState(req.team.get('id'))

  passport.use(new GoogleStrategy({
    authorizationurl: `/adminhttps://accounts.google.com/o/oauth2/v2/auth?state=${state}`,
    callbackURL: 'http://localhost:8080/admin/auth/google'
  }, (accessToken, refreshToken, profile, done) => {
    loadUserByEmail(req, profile.emails[0].value, done)
  }))

  passport.authenticate('google', {
    scope: ['profile','email'],
    session: false
  })(req, res, next)

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

  passport.authenticate('ldapauth', { session: false })(req, res, next)

}

const loadUserByEmail = async (req, email, done) => {

  const user = await User.query(qb => {
    qb.where('email', email)
  }).fetch({
    withRelated: ['photo','team.logo'],
    transacting: req.trx
  })

  if(!user) return done(null, false, { message: 'cannot find user' })

  return done(null, user)

}

const getState = team_id => new Buffer(JSON.stringify({ team_id })).toString('base64')

const success = strategy => async (req, res, next) => {

  res.render('success', {
    token: createUserToken(req.user, 'user_id'),
    team: req.user.related('team'),
    user: req.user
  })

}

const server = express()

server.set('views', path.join(__dirname))

server.set('view engine', 'ejs')

server.get('/cornell', team, cornell, success('cornell'))

server.post('/cornell', team, cornell, success('cornell'))

server.get('/google', team, google, success('google'))

server.get('/ldap', team, ldap, success('ldap'))

export default server
