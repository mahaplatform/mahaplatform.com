import * as domains from '@core/services/aws/domains'

const unlockDomain = async (req, { domain }) => {

  await domains.disableDomainTransferLock({
    name: domain.name
  })

  await domain.save({
    is_locked: false
  },{
    transacting: req.trx
  })

}

export default unlockDomain
