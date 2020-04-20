const path = require('path')
const fs = require('fs')

const parse = (filepath, separator, slice) => {
  const data = fs.readFileSync(path.join('keys', filepath), 'utf8')
  const parts = data.split(/\n/)
  const sliced = slice ? parts.slice(1).slice(0, -2) : parts
  return sliced.join(separator)
}

const output = []
output.push(`CORNELL_DECRYPTION_KEY="${parse('saml-decryption.mahaplatform.com.key', '\\n', false)}"`)
output.push(`CORNELL_DECRYPTION_CERT="${parse('saml-decryption.mahaplatform.com.crt', ' ', true)}"`)
output.push(`CORNELL_SIGNING_KEY="${parse('saml-signing.mahaplatform.com.key', '', true)}"`)
output.push(`CORNELL_SIGNING_CERT="${parse('saml-signing.mahaplatform.com.crt', ' ', true)}"`)
output.push(`CORNELL_CERT="${parse('saml-cornell.prod.crt', ' ', true)}"`)
output.push('CORNELL_ENTRY_POINT=https://shibidp.cit.cornell.edu/idp/profile/SAML2/Redirect/SSO')

fs.writeFileSync('certenv', output.join('\n'))
