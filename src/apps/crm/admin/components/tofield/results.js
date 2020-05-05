import RecipientToken from '../../tokens/recipient'
import PropTypes from 'prop-types'
import React from 'react'

class Results extends React.Component {

  static propTypes = {
    records: PropTypes.array,
    onChoose: PropTypes.func
  }

  render() {
    const { records } = this.props
    return (
      <div className="tofield-picker-results">
        { records.map((record, index) => (
          <div className="tofield-picker-result" key={`result_${index}`}>
            <RecipientToken recipient={ record } />
          </div>
        )) }
      </div>
    )
  }

}

export default Results
