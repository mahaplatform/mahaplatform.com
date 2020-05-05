import PropTypes from 'prop-types'
import Program from './program'
import React from 'react'
import _ from 'lodash'

class Consent extends React.Component {

  static propTypes = {
    channels: PropTypes.array,
    contact: PropTypes.object,
    programs: PropTypes.array
  }

  render() {
    const { programs } = this.props
    return (
      <div className="crm-contact-properties">
        { programs.map((program, index) => (
          <Program { ...this._getProgram(program) } key={`program_${index}`} />
        )) }
      </div>
    )
  }

  _getProgram(program) {
    const { contact } = this.props
    return {
      program,
      contact,
      channels: this._getChannels(program)
    }
  }

  _getChannels(program) {
    const { channels } = this.props
    const found = _.find(channels, {
      id: program.id
    })
    return found ? found.channels : []
  }

}

export default Consent
