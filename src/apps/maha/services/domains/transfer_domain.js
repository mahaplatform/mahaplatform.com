import { route53Domains } from '@core/services/aws'

const checkOperation = async (req, { OperationId }) => {
  return new Promise((resolve, reject) => {
    setTimeout(async () => {
      const operation = await route53Domains.getOperationDetail({
        OperationId
      })
      if(operation.Status === 'SUCCESSFUL') resolve()
      const next = await checkOperation(req, { OperationId })
      resolve(next)
    }, 500)
  })
}

const transferDomain = async (req, params) => {

  const { admin_contact, auto_renew, auth_code, duration, name, registrant_contact, tech_contact } = params

  const OperationId = await route53Domains.transferDomain({
    AdminContact: admin_contact,
    AuthCode: auth_code,
    DomainName: name,
    DurationInYears: duration,
    RegistrantContact: registrant_contact,
    TechContact: tech_contact,
    AutoRenew: auto_renew
  }).promise().then(result => result.OperationId)

  await checkOperation(req, {
    OperationId
  })

  return true

}

export default transferDomain
