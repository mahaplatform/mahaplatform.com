import AuditSerializer from '@apps/maha/serializers/audit_serializer'
import Audit from '@apps/maha/models/audit'

const listRoute = async (req, res) => {

  const audits = await Audit.query(qb => {
    qb.where('auditable_type', req.params.auditable_type)
    qb.where('auditable_id', req.params.auditable_id)
    qb.where('team_id', req.team.get('id'))
    qb.orderBy('created_at', 'asc')
  }).fetchAll({
    withRelated: ['story','contact.photo','user.photo'],
    transacting: req.trx
  })

  res.status(200).respond(audits, AuditSerializer)

}

export default listRoute
