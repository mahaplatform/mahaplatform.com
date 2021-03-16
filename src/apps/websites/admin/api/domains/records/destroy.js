import RecordSerializer from '@apps/websites/serializers/record_serializer'
import { deleteRecords } from '@core/services/aws/route53'
import socket from '@core/services/routes/emitter'
import Domain from '@apps/websites/models/domain'
import Record from '@apps/websites/models/record'

const destroyRoute = async (req, res) => {

  const domain = await Domain.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('id', req.params.domain_id)
  }).fetch({
    transacting: req.trx
  })

  if(!domain) return res.status(404).respond({
    code: 404,
    message: 'Unable to load domain'
  })

  const record = await Record.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('domain_id', domain.get('id'))
    qb.where('id', req.params.id)
  }).fetch({
    transacting: req.trx
  })

  if(!record) return res.status(404).respond({
    code: 404,
    message: 'Unable to load record'
  })

  await deleteRecords(req, {
    aws_zone_id: domain.get('aws_zone_id'),
    records: [
      {
        name: record.get('name') ? `${record.get('name')}.${domain.get('name')}` : domain.get('name'),
        type: record.get('type'),
        value: record.get('value').records[0]
      }
    ]
  })

  await record.destroy({
    transacting: req.trx
  })

  await socket.refresh(req, [
    `/admin/websites/domains/${domain.get('id')}`
  ])

  await res.status(200).respond(record, RecordSerializer)

}

export default destroyRoute
