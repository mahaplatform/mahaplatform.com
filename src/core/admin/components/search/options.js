import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Format from '../format'
import React from 'react'
import _ from 'lodash'

class Options extends React.Component{

  static propTypes = {
    format: PropTypes.any,
    multiple: PropTypes.bool,
    options: PropTypes.any,
    selected: PropTypes.array,
    text: PropTypes.any,
    onToggle: PropTypes.func
  }

  render() {
    const { format, options, text } = this.props
    return (
      <div className="maha-search-results">
        { options.map((option, index) => (
          <div key={`filter_${index}`} className="maha-search-item" onClick={ this._handleChoose.bind(this, option) }>
            <div className="maha-search-item-label">
              <Format { ...option } format={ format } value={ _.get(option, text) } />
            </div>
            <div className="maha-search-item-icon">
              { this._getChecked(option.value) &&
                <i className="fa fa-fw fa-check" />
              }
            </div>
          </div>
        )) }
      </div>
    )
  }

  _getChecked(value) {
    const { selected } = this.props
    return _.includes(selected, value)
  }

  _handleChoose(chosen) {
    const { multiple } = this.props
    this.props.onToggle(multiple, chosen)
  }

}

const mapStateToProps = (state, props) => ({
  selected: state.maha.search[props.cid].selected
})

export default connect(mapStateToProps)(Options)
