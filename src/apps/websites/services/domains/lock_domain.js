import * as domains from '@core/services/aws/domains'

const lockDomain = async (req, { domain }) => {

  await domains.enableDomainTransferLock({
    name: domain.name
  })

  await domain.save({
    is_locked: true
  },{
    transacting: req.trx
  })

}

export default lockDomain
