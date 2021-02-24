import PropTypes from 'prop-types'
import { Form } from '@admin'
import React from 'react'

class Editor extends React.PureComponent {

  static contextTypes = {
    network: PropTypes.object
  }

  render() {
    return (
      <div className="datasets-editor">
        <div className="datasets-editor-main">
          <Form { ...this._getForm() } />
        </div>
        <div className="datasets-editor-sidebar">
        </div>
      </div>
    )
  }

  _getForm() {
    return {
      title: null,
      showHeader: false,
      buttons: [
        { label: 'Save', color: 'grey' },
        { label: 'Publish', color: 'green' }
      ],
      sections: [
        {
          fields: [
            { label: 'Field1', name: 'field1', type: 'textfield' },
            { label: 'Field2', name: 'field2', type: 'textfield' },
            { label: 'Field3', name: 'field3', type: 'textfield' },
            { label: 'Field4', name: 'field4', type: 'textfield' },
            { label: 'Field5', name: 'field5', type: 'textfield' },
            { label: 'Field6', name: 'field6', type: 'textfield' },
            { label: 'Field7', name: 'field7', type: 'textfield' },
            { label: 'Field8', name: 'field8', type: 'textfield' },
            { label: 'Field9', name: 'field9', type: 'textfield' }
          ]
        }
      ]
    }
  }

}

export default Editor
