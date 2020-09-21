import { loadAccountByEmail, result } from './utils'
import { Strategy as SAMLStrategy } from 'passport-saml'
import passport from 'passport'

const config = {
  cert: process.env.CORNELL_CERT,
  issuer: 'saml.mahaplatform.com',
  entryPoint: process.env.CORNELL_ENTRY_POINT,
  privateCert: process.env.CORNELL_SIGNING_KEY || null,
  decryptionPvk: process.env.CORNELL_DECRYPTION_KEY || null,
  callbackUrl: `${process.env.WEB_HOST}/admin/auth/cornell`,
  signatureAlgorithm: 'sha256',
  acceptedClockSkewMs: 300000
}

export const cornell = async (req, res, next) => {

  const strategy = new SAMLStrategy({
    ...config
  }, (profile, done) => {
    loadAccountByEmail(req, profile['urn:oid:1.3.6.1.4.1.5923.1.1.1.6'], done)
  })

  passport.use(strategy)

  passport.authenticate('saml', {
    session: false
  }, result(req, res))(req, res, next)

}

export const metadata = async (req, res) => {
  const strategy = new SAMLStrategy(config, () => {})
  const metadata = strategy.generateServiceProviderMetadata(process.env.CORNELL_DECRYPTION_CERT, process.env.CORNELL_SIGNING_CERT)
  res.status(200).type('application/xml').send(metadata)
}

export default cornell
