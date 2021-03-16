import RecordSerializer from '@apps/websites/serializers/record_serializer'
import Domain from '@apps/websites/models/domain'
import Record from '@apps/websites/models/record'

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

  const records = await Record.filterFetch({
    scope: qb => {
      qb.where('team_id', req.team.get('id'))
      qb.where('domain_id', domain.get('id'))
    },
    sort: {
      params: req.query.$sort,
      defaults: 'name'
    },
    transacting: req.trx
  })

  await res.status(200).respond(records, RecordSerializer)

}

export default showRoute
