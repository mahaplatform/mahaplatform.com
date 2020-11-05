import Program from '@apps/crm/models/program'
import Field from '@apps/maha/models/field'

const fieldsRoute = async (req, res) => {

  const fields = await Field.query(qb => {
    qb.where('parent_type', 'crm_programs')
    qb.where('team_id', req.team.get('id'))
  }).fetchAll({
    transacting: req.trx
  }).then(results => results.toArray())

  const programs = await Program.query(qb => {
    qb.where('team_id', req.team.get('id'))
  }).fetchAll({
    transacting: req.trx
  }).then(results => results.map(program => ({
    label: program.get('title'),
    fields: fields.filter(field => {
      return field.get('parent_id') === program.get('id')
    }).map(field => ({
      label: field.get('label'),
      name: field.get('name'),
      type: field.get('type')
    }))
  })).filter(program => {
    return program.fields.length > 0
  }))

  res.status(200).respond([
    { label: 'First Name', name: 'first_name', type: 'textfield' },
    { label: 'Last Name', name: 'last_name', type: 'textfield' },
    { label: 'Email', name: 'email', type: 'emailfield' },
    { label: 'Address', name: 'address', type: 'addressfield' },
    { label: 'Phone', name: 'phone', type: 'phonefield' },
    { label: 'Photo', name: 'photo', type: 'imagefield' }
  ])

}

export default fieldsRoute
