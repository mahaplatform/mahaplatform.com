import { Strategy as GoogleStrategy } from 'passport-google-oauth20'
import { getState, loadUserByEmail, result } from './utils'
import passport from 'passport'

const google = async (req, res, next) => {

  const state = getState(req)

  passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    authorizationURL: `https://accounts.google.com/o/oauth2/v2/auth?state=${state}`,
    callbackURL: `${process.env.WEB_HOST}/admin/auth/google`,
    userProfileURL: 'https://www.googleapis.com/oauth2/v3/userinfo'
  }, (accessToken, refreshToken, profile, done) => {
    loadUserByEmail(req, profile.emails[0].value, done)
  }))

  passport.authenticate('google', {
    scope: ['profile','email'],
    session: false
  }, result(req, res))(req, res, next)

}

export default google
