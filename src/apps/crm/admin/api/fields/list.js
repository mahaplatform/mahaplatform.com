import FieldSerializer from '../../../../maha/serializers/field_serializer'
import Field from '../../../../maha/models/field'
import Program from '../../../models/program'
import _ from 'lodash'

const listRoute = async (req, res) => {

  const programs = await Program.query(qb => {
    qb.select(req.trx.raw('crm_programs.*,crm_program_user_access.type as access_type'))
    qb.joinRaw('inner join crm_program_user_access on crm_program_user_access.program_id=crm_programs.id and crm_program_user_access.user_id=?', req.user.get('id'))
    qb.where('team_id', req.team.get('id'))
  }).fetchAll({
    withRelated: ['logo'],
    transacting: req.trx
  }).then(results => results.reduce((programs, program) => ({
    ...programs,
    [program.get('id')]: program
  }), {}))

  const fields = await Field.query(qb => {
    qb.where('parent_type', 'crm_programs')
    qb.whereIn('parent_id', Object.keys(programs))
    qb.where('team_id', req.team.get('id'))
  }).fetchAll({
    transacting: req.trx
  })

  const data = Object.values(fields.reduce((data, field) => {
    return {
      ...data,
      [field.get('parent_id')]: {
        id: programs[field.get('parent_id')].get('id'),
        access_type: programs[field.get('parent_id')].get('access_type'),
        title: programs[field.get('parent_id')].get('title'),
        logo: programs[field.get('parent_id')].related('logo').get('path'),
        fields: [
          ..._.get(data, `[${field.get('parent_id')}].fields`) || [],
          FieldSerializer(req, field)
        ]
      }
    }
  }, {}))

  res.status(200).respond(data)

}

export default listRoute
