import { buildSite, publishSite } from '@apps/websites/services/next'
import Queue from '@core/objects/queue'
import moment from 'moment'

const processor = async (req, job) => {

  const hash = moment().format('YYYYMMDDHHmmss')

  await buildSite(req, {
    code: 'abcdef',
    hash
  })

  await publishSite(req, {
    code: 'abcdef',
    hash
  })

}

const DeploySiteQueue = new Queue({
  name: 'deploy_site',
  processor
})

export default DeploySiteQueue
