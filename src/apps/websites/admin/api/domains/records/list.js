import { listRecords } from '@core/services/aws/route53'
import Domain from '@apps/websites/models/domain'

const showRoute = async (req, res) => {

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

  const records = await listRecords({
    name: domain.get('name'),
    aws_zone_id: domain.get('aws_zone_id')
  })

  await res.status(200).respond(records)

}

export default showRoute
