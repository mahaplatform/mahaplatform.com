import { Image, List } from 'maha-admin'
import PropTypes from 'prop-types'
import React from 'react'

const Details = ({ fields, contact }) => {

  const list = {}

  list.items = Object.values(fields.reduce((programs, field) => ({
    ...programs,
    [field.program.id]: {
      ...field.program,
      fields: [
        ...programs[field.program.id] ? programs[field.program.id].fields : [],
        field
      ]
    }
  }), {})).reduce((programs, program) => [
    ...programs,
    {
      component: (
        <div className="crm-contact-properties-section-title">
          <Image src={ program.logo } title={ program.title } transforms={{ w: 24, h: 24 }} />
          { program.title }
        </div>
      )
    },
    ...program.fields.map(field => ({
      label: field.label,
      content: contact.values[field.code]
    }))
  ], [])

  return <List { ...list } />

}

Details.propTypes = {
  contact: PropTypes.object,
  fields: PropTypes.array
}

export default Details
