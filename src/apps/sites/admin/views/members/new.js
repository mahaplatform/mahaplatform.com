import PropTypes from 'prop-types'
import { Form } from 'maha-admin'
import React from 'react'

class New extends React.Component {

  static contextTypes = {
    modal: PropTypes.object,
    router: PropTypes.object
  }

  static propTypes = {
    site_id: PropTypes.number,
    fields: PropTypes.array
  }

  _handleCancel = this._handleCancel.bind(this)
  _handleSuccess = this._handleSuccess.bind(this)

  render() {
    return <Form { ...this._getForm() } />
  }

  _getForm() {
    const { site_id, fields } = this.props
    return {
      title: 'New Member',
      method: 'post',
      action: `/api/admin/sites/sites/${site_id}/members`,
      onCancel: this._handleCancel,
      onSuccess: this._handleSuccess,
      sections: [
        ...fields.reduce((fields, field, index) => [
          ...fields,
          ...index === 0 && field.type !== 'section' ? [{
            type: 'section',
            fields: []
          }] : [],
          field
        ], []).reduce((sections, field) => ({
          ...sections,
          ...field.type === 'section' ? {
            current: sections.current + 1,
            items: [
              ...sections.items,
              {
                label: field.label,
                instructions: field.instructions
              }
            ]
          } : {
            items: sections.items.map((section, index) => {
              if(index !== sections.current) return section
              return {
                ...section,
                fields: [
                  ...section.fields || [],
                  {
                    ...field.config,
                    type: field.type
                  }
                ]
              }
            })
          }
        }), { items: [], current: -1 }).items
      ]
    }
  }


  _handleCancel() {
    this.context.modal.close()
  }

  _handleSuccess(site) {
    this.context.modal.close()
  }

}

export default New
