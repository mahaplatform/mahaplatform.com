import PropTypes from 'prop-types'
import React from 'react'

class Results extends React.Component {

  static propTypes = {
    format: PropTypes.any,
    records: PropTypes.array,
    onChoose: PropTypes.func
  }

  render() {
    const { records } = this.props
    const Component = this.props.format
    return (
      <div className="maha-criteria-results">
        { records.map((record, index) => (
          <div className="maha-criteria-result" key={ `result_message_${record.id}`}>
            <Component { ...record } />
          </div>
        )) }
      </div>
    )
  }

}

export default Results
