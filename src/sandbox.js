// ssh -i ~/.ssh/mahaplatform -L 127.0.0.1:1234:127.0.0.1:5432 centos@3.208.31.159

import './core/vendor/sourcemaps'
import './core/services/environment'
// import knex from './core/vendor/knex'
import { acm } from '@core/vendor/aws'

const requestCertificate = async (req, { domain }) => {
  const result = await acm.requestCertificate({
    DomainName: domain,
    ValidationMethod: 'EMAIL',
    SubjectAlternativeNames: [
      `www.${domain}`
    ]
  }).promise()
  console.log(result.CertificateArn)
}

const processor = async () => {
  // await knex.transaction(async(trx) => {
  // })
  const req = {}
  await requestCertificate(req, {
    domain: 'thinktopography.com'
  })

}

processor().then(process.exit)
