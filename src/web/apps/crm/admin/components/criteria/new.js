import PropTypes from 'prop-types'
import React from 'react'

class New extends React.Component {

  static contextTypes = {}

  static propTypes = {
    fields: PropTypes.array
  }

  render() {
    const { fields } = this.props
    return (
      <div className="crm-criteria-designer-new">
        <strong>Contact Properties</strong><br />
        { fields.map((field, index) => (
          <div key={`field_${index}`}>
            { field.label }
          </div>
        )) }
      </div>
    )
  }

}

export default New
