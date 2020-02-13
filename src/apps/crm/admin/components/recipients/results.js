import ContactToken from '../../tokens/contact'
import PropTypes from 'prop-types'
import React from 'react'

class Results extends React.PureComponent {

  static propTypes = {
    records: PropTypes.array
  }

  render() {
    const { records } = this.props
    return (
      <div>
        { records.map((record, index) => (
          <ContactToken { ...record } key={`contact_${index}`} />
        )) }
      </div>
    )
  }

}

export default Results
