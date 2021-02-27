import { Form, Versions } from '@admin'
import PropTypes from 'prop-types'
import React from 'react'

class Editor extends React.PureComponent {

  static contextTypes = {
    network: PropTypes.object
  }

  static propTypes = {
    dataset: PropTypes.object,
    fields: PropTypes.array,
    record: PropTypes.object
  }

  render() {
    return (
      <div className="datasets-editor">
        <div className="datasets-editor-main">
          <Form { ...this._getForm() } />
        </div>
        <div className="datasets-editor-sidebar">
          <Versions { ...this._getVersions() } />
        </div>
      </div>
    )
  }

  _getForm() {
    const { fields } = this.props
    return {
      title: null,
      showHeader: false,
      buttons: [
        { label: 'Save', color: 'grey' },
        { label: 'Publish', color: 'green' }
      ],
      sections: [
        {
          fields: fields.map(field => ({
            label: field.label,
            name: `values.${field.code}`,
            type: 'textfield'
          }))
        }
      ]
    }
  }

  _getVersions() {
    const { record } = this.props
    return {
      entity: `datasets_records/${record.id}/values`,
      versions: [],
      version: {}
    }
  }

}

export default Editor
