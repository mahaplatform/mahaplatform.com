import PropTypes from 'prop-types'
import Program from './program'
import React from 'react'

class Properties extends React.Component {

  static propTypes = {
    contact: PropTypes.object,
    fields: PropTypes.array,
    programs: PropTypes.array
  }

  render() {
    const { programs } = this.props
    return (
      <div className="crm-contact-properties">
        <div className="crm-contact-properties-title">
          Program
        </div>
        { programs.map((program, index) => (
          <Program { ...this._getProgram(program) } key={`program_${index}`} />
        )) }
      </div>
    )
  }

  _getProgram(program) {
    const { contact } = this.props
    return {
      contact,
      program,
      fields: this._getFields(program),
      lists: this._getLists(program),
      topics: this._getTopics(program)
    }
  }

  _getFields(program) {
    const { fields } = this.props
    return fields.filter(field => {
      return field.program.id === program.id
    })
  }

  _getLists(program) {
    const { contact } = this.props
    return contact.lists.filter(list => {
      return list.program_id === program.id
    })
  }

  _getTopics(program) {
    const { contact } = this.props
    return contact.topics.filter(topic => {
      return topic.program_id === program.id
    })
  }

}

export default Properties
