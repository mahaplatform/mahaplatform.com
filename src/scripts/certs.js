const fs = require('fs')

const parse = (filepath) => {
  const data = fs.readFileSync(filepath, 'utf8')
  return data.split(/\n/).slice(1).slice(0, -2).join(' ')
}

const output = []
output.push(`CORNELL_DECRYPTION_KEY="${parse('saml-decryption.mahaplatform.com.key')}"`)
output.push(`CORNELL_DECRYPTION_CERT="${parse('saml-decryption.mahaplatform.com.crt')}"`)
output.push(`CORNELL_SIGNING_KEY="${parse('saml-signing.mahaplatform.com.key')}"`)
output.push(`CORNELL_SIGNING_CERT="${parse('saml-signing.mahaplatform.com.crt')}"`)

fs.writeFileSync('certenv', output.join('\n'))
