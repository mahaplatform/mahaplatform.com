import { loadUserByEmail, result } from './utils'
import LDAPStrategy from 'passport-ldapauth'
import passport from 'passport'

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

export default ldap
