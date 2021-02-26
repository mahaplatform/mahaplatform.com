import RecordSerializer from '@apps/datasets/serializers/record_serializer'
import { createVersion } from '@apps/maha/services/versions'
// import { addIndex } from '@apps/sites/services/search'
import generateCode from '@core/utils/generate_code'
import Dataset from '@apps/datasets/models/dataset'
import socket from '@core/services/routes/emitter'
import Record from '@apps/datasets/models/record'
import Type from '@apps/datasets/models/type'

const createRoute = async (req, res) => {

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

  const code = await generateCode(req, {
    table: 'datasets_records'
  })

  const record = await Record.forge({
    team_id: req.team.get('id'),
    type_id: type.get('id'),
    code
  }).save(null, {
    transacting: req.trx
  })

  const version = await createVersion(req, {
    versionable_type: 'datasets_records',
    versionable_id: record.get('id'),
    key: 'values',
    value: req.body.values
  })


  // await addIndex(req, {
  //   record,
  //   map
  // })

  await socket.refresh(req, [
    `/admin/datasets/datasets/${dataset.get('id')}/types/${type.get('id')}/records`
  ])

  res.status(200).respond(record, RecordSerializer)

}

export default createRoute
