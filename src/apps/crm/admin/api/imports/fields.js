import Field from '../../../../maha/models/field'
import Program from '../../../models/program'

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
    withRelated: ['logo'],
    transacting: req.trx
  }).then(results => results.map(program => ({
    label: program.get('title'),
    logo: program.related('logo').get('path'),
    fields: fields.filter(field => {
      return field.get('parent_id') === program.get('id')
    }).map(field => ({
      label: field.get('label'),
      name: `values.${field.get('code')}`,
      type: field.get('type')
    }))
  })).filter(program => {
    return program.fields.length > 0
  }))

  res.status(200).respond([
    {
      label: 'Core Fields',
      fields: [
        { label: 'Full Name', name: 'full_name', type: 'textfield' },
        { label: 'First Name', name: 'first_name', type: 'textfield' },
        { label: 'Last Name', name: 'last_name', type: 'textfield' },
        { label: 'Photo', name: 'photo', type: 'imagefield' },
        ...Array(3).fill(0).reduce((fields, i, j) => [
          ...fields,
          { label: `Organization ${j+1}`, name: `organization_${j+1}`, type: 'textfield' }
        ], []),
        ...Array(3).fill(0).reduce((fields, i, j) => [
          ...fields,
          { label: `Email ${j+1}`, name: `email_${j+1}`, type: 'emailfield' }
        ], []),
        ...Array(3).fill(0).reduce((fields, i, j) => [
          ...fields,
          { label: `Phone ${j+1}`, name: `phone_${j+1}`, type: 'phonefield' }
        ], []),
        ...Array(3).fill(0).reduce((fields, i, j) => [
          ...fields,
          { label: `Address ${j+1}`, name: `address_${j+1}`, type: 'addressfield' },
          { label: `Address ${j+1} - Street 1`, name: `address_${j+1}_street_1`, type: 'textfield' },
          { label: `Address ${j+1} - Street 2`, name: `address_${j+1}_street_2`, type: 'textfield' },
          { label: `Address ${j+1} - City`, name: `address_${j+1}_city`, type: 'textfield' },
          { label: `Address ${j+1} - State/Province`, name: `address_${j+1}_state_province`, type: 'textfield' },
          { label: `Address ${j+1} - Postal Code`, name: `address_${j+1}_postal_code`, type: 'textfield' }
        ], []),
        { label: 'Birthday', name: 'birthday', type: 'birthdayfield' },
        { label: 'Spouse', name: 'spouse', type: 'textfield' }
      ]
    },
    ...programs
  ])

}

export default fieldsRoute
