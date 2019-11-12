import TextField from './textfield'
import PropTypes from 'prop-types'
import Dropdown from './dropdown'
import Text from './text'
import React from 'react'

class Field extends React.Component {

  static propTypes = {
    field: PropTypes.object
  }

  render() {
    const { field } = this.props
    const { label, required, type } = field
    return (
      <div className="field">
        { label &&
          <label>{ label }</label>
        }
        { type === 'text' && <Text { ...field } /> }
        { type === 'textfield' && <TextField { ...field } /> }
        { type === 'dropdown' && <Dropdown { ...field } /> }
      </div>
    )
  }

}

export default Field
