import ContactToken from '../../tokens/contact'
import PropTypes from 'prop-types'
import React from 'react'

class Contacts extends React.Component {

  static propTypes = {
    records: PropTypes.array,
    onChoose: PropTypes.func
  }

  render() {
    const { records } = this.props
    return (
      <div className="crm-criteria-contacts">
        { records.map((contact, index) => (
          <ContactToken { ...contact } key={ `result_message_${contact.id}`} />
        )) }
      </div>
    )
  }

}

export default Contacts
