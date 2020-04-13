import { getState, loadUserByEmail, result } from './utils'
import { Strategy as SAMLStrategy } from 'passport-saml'
import passport from 'passport'

const cornell = async (req, res, next) => {

  const state = getState(req)

  passport.use(new SAMLStrategy({
    cert: process.env.CORNELL_CERT,
    issuer: process.env.CORNELL_ISSUER,
    entryPoint: process.env.CORNELL_ENTRY_POINT,
    callbackUrl: `${process.env.WEB_HOST}/admin/auth/cornell?state=${state}`,
    acceptedClockSkewMs: 300000
  }, (profile, done) => {
    loadUserByEmail(req, profile.email, done)
  }))

  passport.authenticate('saml', {
    session: false
  }, result(req, res))(req, res, next)

}

export default cornell
