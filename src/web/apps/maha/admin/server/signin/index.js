import path from 'path'
import express from 'express'
import passport from 'passport'
import Strategy from '../../../models/strategy'
import Team from '../../../models/team'
import User from '../../../models/user'
import { Strategy as SAMLStrategy } from 'passport-saml'
import { Strategy as GoogleStrategy } from 'passport-google-oauth20'
import LDAPStrategy from 'passport-ldapauth'
import sessionSerilizer from '../../../serializers/session_serializer'

const team = async (req, res, next) => {

  if(!req.query.state) throw new Error({ code: 500, message: 'unable to load state' })

  const state = JSON.parse(Buffer.from(req.query.state, 'base64'))

  req.team = await Team.where({ id: state.team_id }).fetch()

  next()

}

const cornell = async (req, res, next) => {

  const config = await getStrategyConfig(req.team.get('id'), 'cornell')

  const state = getState(req.team.get('id'))

  passport.use(new SAMLStrategy({
    ...config,
    path: `/signin/cornell?state=${state}`,
    acceptedClockSkewMs: 300000
  }, (profile, done) => {
    loadUserByEmail(profile.email, done)
  }))

  passport.authenticate('saml', { session: false })(req, res, next)

}

const google = async (req, res, next) => {

  const config = await getStrategyConfig(req.team.get('id'), 'google')

  const state = getState(req.team.get('id'))

  passport.use(new GoogleStrategy({
    ...config,
    authorizationurl: `/adminhttps://accounts.google.com/o/oauth2/v2/auth?state=${state}`,
    callbackURL: 'http://localhost:8080/admin/signin/google'
  }, (accessToken, refreshToken, profile, done) => {
    loadUserByEmail(profile.emails[0].value, done)
  }))

  passport.authenticate('google', { scope: ['profile','email'], session: false })(req, res, next)

}

const ldap = (req, res, next) => {

  passport.use(new LDAPStrategy({
    url: 'ldap://0.0.0.0:1389',
    base: 'o=example',
    search: {
      filter: '(&(l=Seattle)(email=*@foo.com))'
    }
  }, (req, user, done) => {
    loadUserByEmail(user.email, done)
  }))

  passport.authenticate('ldapauth', { session: false })(req, res, next)

}

const loadUserByEmail = async (email, done) => {

  const user = await User.where({ email }).fetch()

  if(!user) return done(null, false, { message: 'cannot find user' })

  return done(null, user)

}

const getStrategyConfig = async (team_id, name) => {

  const strategy = await Strategy.where({ team_id, name }).fetch()

  return strategy.get('config')

}

const getState = team_id => new Buffer(JSON.stringify({ team_id })).toString('base64')

const success = strategy => async (req, res, next) => {

  const team = await Team.where({ id: req.user.get('team_id') }).fetch({ withRelated: ['logo'] })

  if(!team) return next(new Error({ code: 500, message: 'unable to load team' }))

  const session = await sessionSerilizer(req, null, req.user)

  res.render('success', { strategy, session })

}

const server = express()

server.set('views', path.join(__dirname))

server.set('view engine', 'ejs')

server.get('/signin/cornell', team, cornell, success('cornell'))

server.post('/signin/cornell', team, cornell, success('cornell'))

server.get('/signin/google', team, google, success('google'))

server.get('/signin/ldap', team, ldap, success('ldap'))

export default server
