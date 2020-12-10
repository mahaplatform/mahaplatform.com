import { acm } from '@core/vendor/aws'

const requestCertificate = async (req, { aliases, name }) => {

  const result = await acm.requestCertificate({
    DomainName: name,
    ValidationMethod: 'DNS',
    SubjectAlternativeNames: [
      name,
      ...aliases || []
    ]
  }).promise()

  return {
    aws_certificate_arn: result.CertificateArn
  }

}

export default requestCertificate
