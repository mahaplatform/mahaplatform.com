import Topic from '@apps/crm/models/topic'

const topicsRoute = async (req, res) => {

  const topics = await Topic.filterFetch({
    scope: (qb) => {
      qb.select('crm_topics.*')
      qb.where('program_id', req.params.program_id)
    },
    transacting: req.trx
  })

  await res.status(200).respond(topics, (req, topic) => ({
    id: topic.get('id'),
    title: topic.get('title')
  }))

}

export default topicsRoute
