import PropTypes from 'prop-types'
import Format from '../format'
import React from 'react'

class Results extends React.Component {

  static propTypes = {
    format: PropTypes.any,
    records: PropTypes.array,
    onChoose: PropTypes.func
  }

  render() {
    const { format, records } = this.props
    return (
      <div className="maha-criteria-results">
        { records.map((record, index) => (
          <div className="maha-criteria-result" key={`result_${index}`}>
            <Format format={ format } { ...record } />
          </div>
        )) }
      </div>
    )
  }

}

export default Results
