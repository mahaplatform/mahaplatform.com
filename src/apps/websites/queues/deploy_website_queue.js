import { buildWebsite, publishWebsite } from '@apps/websites/services/websites'
import Queue from '@core/objects/queue'
import moment from 'moment'

const processor = async (req, job) => {

  const hash = moment().format('YYYYMMDDHHmmss')

  await buildWebsite(req, {
    code: 'abcdef',
    hash
  })

  await publishWebsite(req, {
    code: 'abcdef',
    hash
  })

}

const DeployWebsiteQueue = new Queue({
  queue: 'worker',
  name: 'deploy_website',
  processor
})

export default DeployWebsiteQueue
