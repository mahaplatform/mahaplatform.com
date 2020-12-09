import { route53Domains } from '@core/vendor/aws'

const transferCheckRoute = async (req, res) => {

  const transferable = await route53Domains.checkDomainTransferability({
    DomainName: req.query.name
  }).promise().then(result => ({
    transferable: result.Transferability.Transferable
  }))

  res.status(200).respond(transferable)

}

export default transferCheckRoute
