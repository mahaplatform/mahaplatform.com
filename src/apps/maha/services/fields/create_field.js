import generateCode from '@core/utils/generate_code'
import Field from '@apps/maha/models/field'

const createField = async (req, params) => {

  const delta = await Field.query(qb => {
    qb.where('parent_type', params.parent_type)
    if(params.parent_id) qb.where('parent_id', params.parent_id)
    qb.where('team_id', req.team.get('id'))
  }).count('*', {
    transacting: req.trx
  })

  const code = await generateCode(req, {
    table: 'maha_fields'
  })

  const field = await Field.forge({
    team_id: req.team.get('id'),
    parent_type: params.parent_type,
    parent_id: params.parent_id,
    code,
    delta,
    name: params.name,
    type: params.type,
    config: {
      required: false,
      ...params.config
    },
    is_mutable: params.is_mutable,
    is_active: true
  }).save(null, {
    transacting: req.trx
  })

  return field

}

export default createField
