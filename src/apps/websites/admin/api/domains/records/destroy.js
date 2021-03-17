import { deleteRecords } from '@core/services/aws/route53'
import socket from '@core/services/routes/emitter'
import Domain from '@apps/websites/models/domain'

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

  await deleteRecords(req, {
    aws_zone_id: domain.get('aws_zone_id'),
    records: [
      {
        name: req.body.record.name,
        type: req.body.record.type,
        ttl: req.body.record.ttl,
        records: req.body.record.records
      }
    ]
  })

  await socket.refresh(req, [
    `/admin/websites/domains/${domain.get('id')}`
  ])

  await res.status(200).respond(true)

}

export default destroyRoute
