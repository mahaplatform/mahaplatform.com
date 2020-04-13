import { getState, loadUserByEmail, result } from './utils'
import { Strategy as SAMLStrategy } from 'passport-saml'
import passport from 'passport'

export const cornell = async (req, res, next) => {

  const state = getState(req)

  const strategy = new SAMLStrategy({
    cert: process.env.CORNELL_CERT,
    issuer: process.env.CORNELL_ISSUER,
    entryPoint: process.env.CORNELL_ENTRY_POINT,
    callbackUrl: `${process.env.WEB_HOST}/admin/auth/cornell?RelayState=${state}`,
    acceptedClockSkewMs: 300000
  }, (profile, done) => {
    loadUserByEmail(req, profile.email, done)
  })

  passport.use(strategy)

  passport.authenticate('saml', {
    session: false
  }, result(req, res))(req, res, next)

}

export const metadata = async (req, res) => {

  const strategy = new SAMLStrategy({
    cert: process.env.CORNELL_CERT,
    issuer: process.env.CORNELL_ISSUER,
    entryPoint: process.env.CORNELL_ENTRY_POINT,
    callbackUrl: `${process.env.WEB_HOST}/admin/auth/cornell`,
    acceptedClockSkewMs: 300000
  }, (profile, done) => {
    loadUserByEmail(req, profile.email, done)
  })

  res.status(200).type('application/xml').send(strategy.generateServiceProviderMetadata())

}

export default cornell
