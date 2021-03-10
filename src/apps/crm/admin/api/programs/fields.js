import FieldSerializer from '@apps/maha/serializers/field_serializer'
import { checkProgramAccess } from '@apps/crm/services/programs'
import Field from '@apps/maha/models/field'

const listRoute = async (req, res) => {

  const access = await checkProgramAccess(req, {
    program_id: req.params.program_id,
    types: ['manage','edit','view']
  })

  if(!access) return res.status(403).respond({
    code: 403,
    message: 'You dont have sufficient access to perform this action'
  })

  const fields = await Field.query(qb => {
    qb.where('parent_type', 'crm_programs')
    qb.where('parent_id', req.params.program_id)
    qb.where('team_id', req.team.get('id'))
    qb.orderBy('delta', 'asc')
  }).fetchAll({
    transacting: req.trx
  })

  await res.status(200).respond(fields, FieldSerializer)

}

export default listRoute
