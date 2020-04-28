// import { Button } from 'maha-admin'
import PropTypes from 'prop-types'
import React from 'react'

const Content = ({ data, field }) => {
  const value = data[field.code]
  const type = field.type === 'contactfield' ? field.contactfield.type : field.type
  if(!value) return null
  if(type === 'productfield') {
    return <span>products</span>
  } else if(type === 'addressfield') {
    return <span>{ value.description }</span>
  } else if(type === 'checkbox') {
    return <span>{ `${value}` }</span>
  } else if(type === 'checkboxes') {
    return <span>{ `${value.join(', ')}` }</span>
  // } else if(type === 'filefield') {
  //   return (
  //     <div>
  //       { data.map((file, index) => (
  //         <div key={`file_${index}`}>
  //           <Button label={ file.file_name } className="link" route={`/admin/crm/forms/${form.id}/responses/${response.id}/uploads/${file.id}`} />
  //         </div>
  //       ))}
  //     </div>
  //   )
  }
  return <span>{ value }</span>
}

Content.propTypes = {
  data: PropTypes.object,
  field: PropTypes.object
}

export default Content
