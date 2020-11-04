import RecipientToken from '../../tokens/recipient'
import PropTypes from 'prop-types'
import React from 'react'

class Results extends React.Component {

  static propTypes = {
    records: PropTypes.array,
    onRemove: PropTypes.func
  }

  render() {
    const { records, onRemove } = this.props
    return (
      <div className="tofield-picker-results">
        { records.map((record, index) => (
          <div className="tofield-picker-result" key={`result_${index}`}>
            <div className="tofield-picker-result-token">
              <RecipientToken recipient={ record } />
            </div>
            { onRemove &&
              <div className="tofield-picker-result-remove" onClick={ this._handleRemove.bind(this, record) }>
                <i className="fa fa-times" />
              </div>
            }
          </div>
        )) }
      </div>
    )
  }

  _handleRemove(record) {
    this.props.onRemove(record.id)
  }

}

export default Results
