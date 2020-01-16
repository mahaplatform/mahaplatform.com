import FieldSerializer from '../../../../maha/serializers/field_serializer'
import Field from '../../../../maha/models/field'
import Program from '../../../models/program'

const listRoute = async (req, res) => {

  const fields = await Field.query(qb => {
    qb.where('parent_type', 'crm_programs')
    qb.where('team_id', req.team.get('id'))
  }).fetchAll({
    transacting: req.trx
  })

  const programs = await Program.query(qb => {
    qb.where('team_id', req.team.get('id'))
  }).fetchAll({
    withRelated: ['logo'],
    transacting: req.trx
  }).then(results => results.reduce((programs, program) => ({
    ...programs,
    [program.get('id')]: program
  }), {}))

  const serializer = (req, field) => {
    const program = programs[field.get('parent_id')]
    return {
      ...FieldSerializer(req, field),
      program: {
        id: program.get('id'),
        title: program.get('title'),
        logo: program.related('logo').get('path')
      }
    }
  }

  res.status(200).respond(fields, serializer)

}

export default listRoute
