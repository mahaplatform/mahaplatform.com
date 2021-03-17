import * as domains from '@apps/websites/services/domains'
import Domain from '@apps/websites/models/domain'
import Queue from '@core/objects/queue'

const processor = async (req, job) => {

  const { action, domain_id } = job.data

  const domain = await Domain.query(qb => {
    qb.where('id', domain_id)
  }).fetch({
    transacting: req.trx
  })

  if(action === 'create_zone') {

    await domains.createZone(req, {
      domain
    })

  } else if(action === 'check_nameservers') {

    await domains.checkNameservers(req, {
      domain
    })

  } else if(action === 'register_domain') {

    await domains.registerDomain(req, {
      domain
    })

  } else if(action === 'transfer_domain') {

    // tranfer

  } else if(action === 'check_registrant') {

    await domains.checkRegistrant(req, {
      domain
    })

  } else if(action === 'check_operation') {

    await domains.checkOperation(req, {
      domain
    })

  } else if(action === 'setup_zone') {

    await domains.setupZone(req, {
      domain
    })

  }

}

const SetupDomainQueue = new Queue({
  queue: 'worker',
  name: 'setup_domain',
  processor
})

export default SetupDomainQueue
