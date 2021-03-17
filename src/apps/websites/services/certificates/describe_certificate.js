import { acm } from '@core/vendor/aws'

const getCertificate = async (req, { aws_certificate_arn }) => {

  const certificate = await acm.describeCertificate({
    CertificateArn: aws_certificate_arn
  }).promise().then(result => result.Certificate)

  return {
    expires_on: certificate.NotAfter,
    status: certificate.Status
  }

}

export default getCertificate
