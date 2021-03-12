import { createDistribution } from '@apps/websites/services/websites'
import Website from '@apps/websites/models/website'
import Queue from '@core/objects/queue'

const processor = async (req, job) => {

  const website = await Website.query(qb => {
    qb.where('id', job.data.website_id)
  }).fetch({
    transacting: req.trx
  })

  await createDistribution(req, {
    website
  })

}

const CreateDistributionQueue = new Queue({
  queue: 'worker',
  name: 'create_distribution',
  processor
})

export default CreateDistributionQueue
