import { acm } from '@core/vendor/aws'

const requestCertificate = async (req, { domain, method }) => {

  const certificate = await acm.requestCertificate({
    DomainName: domain,
    ValidationMethod: method,
    SubjectAlternativeNames: [`www.${domain}`],
    DomainValidationOptions: [
      {
        DomainName: domain,
        ValidationDomain: domain
      }
    ]
  }).promise()

  return {
    aws_certificate_arn: certificate.CertificateArn
  }

}

export default requestCertificate
