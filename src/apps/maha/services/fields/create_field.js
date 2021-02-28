import generateCode from '@core/utils/generate_code'
import Field from '@apps/maha/models/field'

const createField = async (req, params) => {

  const delta = await Field.query(qb => {
    qb.where('maha_fields.parent_type', req.params.parent_type)
    if(req.params.parent_id) {
      qb.where('maha_fields.parent_id', req.params.parent_id)
    }
    qb.where('team_id', req.team.get('id'))
  }).count('*', {
    transacting: req.trx
  })

  const code = await generateCode(req, {
    table: 'datasets_types'
  })

  const field = await Field.forge({
    team_id: req.team.get('id'),
    parent_type: params.parent_type,
    parent_id: params.parent_id,
    code,
    delta,
    name: params.name,
    label: params.label,
    type: params.type,
    config: {},
    instructions: params.instructions,
    is_mutable: params.is_mutable,
    is_active: true,
    is_primary: params.is_primary
  }).save(null, {
    transacting: req.trx
  })

  return field

}

export default createField
