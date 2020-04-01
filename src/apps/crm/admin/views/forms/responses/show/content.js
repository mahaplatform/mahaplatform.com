import { Button } from 'maha-admin'
import PropTypes from 'prop-types'
import React from 'react'

const Content = ({ form, response, field }) => {
  const data = response.data[field.code]
  const type = field.type === 'contactfield' ? field.contactfield.type : field.type
  if(!data) return null
  if(type === 'productfield') {
    return <span>products</span>
  } else if(type === 'addressfield') {
    return <span>{ data.description }</span>
  } else if(type === 'checkbox') {
    return <span>{ `${data}` }</span>
  } else if(type === 'filefield') {
    return (
      <div>
        { data.map((file, index) => (
          <div key={`file_${index}`}>
            <Button label={ file.file_name } className="link" route={`/admin/crm/forms/${form.id}/responses/${response.id}/uploads/${file.id}`} />
          </div>
        ))}
      </div>
    )
  }
  return <span>{ data }</span>
}

Content.propTypes = {
  form: PropTypes.object,
  response: PropTypes.object,
  field: PropTypes.object
}

export default Content
