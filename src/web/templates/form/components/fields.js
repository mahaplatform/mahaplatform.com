import PropTypes from 'prop-types'
import Field from './field'
import React from 'react'

class Form extends React.Component {

  static propTypes = {
    fields: PropTypes.array
  }

  render() {
    const { fields } = this.props
    return (
      <div className="maha-form-fields">
        <form className="ui form">
          { fields.map((field, index) => (
            <Field key={`field_${index}`} field={ field } />
          )) }
          <button className="ui blue fluid button" type="submit">Submit</button>
        </form>
      </div>
    )
  }

}

export default Form
