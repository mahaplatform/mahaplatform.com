import RecordSerializer from '@apps/datasets/serializers/record_serializer'
import Dataset from '@apps/datasets/models/dataset'
import Type from '@apps/datasets/models/type'
import Record from '@apps/datasets/models/record'

const listRoute = async (req, res) => {

  const dataset = await Dataset.query(qb => {
    qb.where('id', req.params.dataset_id)
  }).fetch({
    transacting: req.trx
  })

  if(!dataset) return res.status(404).respond({
    code: 404,
    message: 'Unable to load dataset'
  })

  const type = await Type.query(qb => {
    qb.where('dataset_id', dataset.get('id'))
    qb.where('id', req.params.type_id)
  }).fetch({
    transacting: req.trx
  })

  if(!type) return res.status(404).respond({
    code: 404,
    message: 'Unable to load type'
  })

  const records = await Record.filterFetch({
    scope: (qb) => {
      qb.where('team_id', req.team.get('id'))
      qb.where('type_id', type.get('id'))
    },
    filter: {
      params: req.params.$filter
    },
    sort: {
      params: req.params.$sort
    },
    page: req.query.$page,
    transacting: req.trx
  })

  res.status(200).respond(records, RecordSerializer)

}

export default listRoute
