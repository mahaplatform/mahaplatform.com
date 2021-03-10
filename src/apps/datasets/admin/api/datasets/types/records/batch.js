import { publishVersion, archiveVersion } from '@apps/maha/services/versions'
import Dataset from '@apps/datasets/models/dataset'
import socket from '@core/services/routes/emitter'
import Record from '@apps/datasets/models/record'
import Type from '@apps/datasets/models/type'
import moment from 'moment'

const batchRoute = async (req, res) => {

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
    scope: qb => {
      qb.where('team_id', req.team.get('id'))
      qb.where('type_id', type.get('id'))
    },
    filter: {
      params: req.body.filter
    },
    transacting: req.trx
  })


  if(req.body.operation  === 'delete') {
    await req.trx('datasets_records').whereIn('id', records.map(record => {
      return record.get('id')
    })).update({
      deleted_at: moment()
    })
  } else {
    const operation = req.body.operation === 'publish' ? publishVersion : archiveVersion
    await Promise.mapSeries(records, async (record) => {
      await operation(req, {
        versionable_type: 'datasets_records',
        versionable_id: record.get('id'),
        key: 'values'
      })
    })
  }

  await socket.refresh(req, [
    `/admin/datasets/datasets/${dataset.get('id')}/types/${type.get('id')}/records`
  ])

  await res.status(200).respond(true)

}

export default batchRoute
