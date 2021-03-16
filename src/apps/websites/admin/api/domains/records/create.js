import RecordSerializer from '@apps/websites/serializers/record_serializer'
import { createRecords } from '@core/services/aws/route53'
import socket from '@core/services/routes/emitter'
import Domain from '@apps/websites/models/domain'
import Record from '@apps/websites/models/record'

const createRoute = async (req, res) => {

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

  const record = await Record.forge({
    team_id: req.team.get('id'),
    domain_id: domain.get('id'),
    name: req.body.name,
    type: req.body.type,
    value: {
      records: [
        req.body.value
      ]
    }
  }).save(null, {
    transacting: req.trx
  })

  await createRecords(req, {
    aws_zone_id: domain.get('aws_zone_id'),
    records: [
      {
        name: req.body.name ? `${req.body.name}.${domain.get('name')}` : domain.get('name'),
        type: req.body.type,
        value: req.body.value
      }
    ]
  })

  await socket.refresh(req, [
    `/admin/websites/domains/${domain.get('id')}`
  ])

  await res.status(200).respond(record, RecordSerializer)

}

export default createRoute
