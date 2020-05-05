import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Format from '../format'
import React from 'react'
import _ from 'lodash'

class Options extends React.Component{

  static propTypes = {
    excludeIds: PropTypes.array,
    format: PropTypes.any,
    multiple: PropTypes.bool,
    options: PropTypes.any,
    selected: PropTypes.array,
    text: PropTypes.any,
    value: PropTypes.any,
    onToggle: PropTypes.func
  }

  render() {
    const { format, text } = this.props
    const options = this._getOptions()
    return (
      <div className="maha-search-results">
        { options.map((option, index) => (
          <div key={`filter_${index}`} className="maha-search-item" onClick={ this._handleChoose.bind(this, option) }>
            <div className="maha-search-item-label">
              <Format { ...option } format={ format } value={ _.get(option, text) } />
            </div>
            <div className="maha-search-item-icon">
              { this._getChecked(option) &&
                <i className="fa fa-fw fa-check" />
              }
            </div>
          </div>
        )) }
      </div>
    )
  }

  _getOptions() {
    const { excludeIds, options } = this.props
    if(!excludeIds) return options
    return options.filter(option => {
      return !_.includes(excludeIds, option.id)
    })
  }

  _getChecked(option) {
    const { selected, value } = this.props
    if(!selected) return false
    return selected.find(item => {
      return value ? _.get(option, value) === item : _.isEqual(item, option)
    }) !== undefined
  }


  _handleChoose(option) {
    const { multiple, value } = this.props
    const chosen = value ? _.get(option, value) : option
    this.props.onToggle(multiple, chosen)
  }

}

const mapStateToProps = (state, props) => ({
  selected: state.maha.search[props.cid].selected
})

export default connect(mapStateToProps)(Options)
