const fs = require('fs')

const parse = (filepath, separator) => {
  const data = fs.readFileSync(filepath, 'utf8')
  return data.split(/\n/).slice(1).slice(0, -2).join(separator)
}

const output = []
output.push(`CORNELL_DECRYPTION_KEY="${parse('saml-decryption.mahaplatform.com.key', '')}"`)
output.push(`CORNELL_DECRYPTION_CERT="${parse('saml-decryption.mahaplatform.com.crt', ' ')}"`)
output.push(`CORNELL_SIGNING_KEY="${parse('saml-signing.mahaplatform.com.key', '')}"`)
output.push(`CORNELL_SIGNING_CERT="${parse('saml-signing.mahaplatform.com.crt', ' ')}"`)
output.push(`CORNELL_CERT="${parse('saml-cornell.prod.crt', ' ')}"`)
output.push('CORNELL_ENTRY_POINT=https://shibidp.cit.cornell.edu/idp/profile/SAML2/Redirect/SSO')

fs.writeFileSync('certenv', output.join('\n'))
