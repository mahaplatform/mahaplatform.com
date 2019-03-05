import { is_starred } from './selectors'
import { connect } from 'react-redux'
import * as actions from './actions'
import PropTypes from 'prop-types'
import React from 'react'
import _ from 'lodash'

class Star extends React.Component {

  static contextTypes = {
    network: PropTypes.object
  }

  static propTypes = {
    id: PropTypes.number,
    label: PropTypes.string,
    is_starred: PropTypes.bool,
    starText: PropTypes.string,
    table: PropTypes.string,
    unstarText: PropTypes.string,
    onStar: PropTypes.func,
    onUnstar: PropTypes.func
  }

  static defaultProps = {
    label: 'item'
  }

  _handleClick = this._handleClick.bind(this)
  _handleToggle = _.debounce(this._handleToggle.bind(this), 250, { leading: true, trailing: false })

  render() {
    const { is_starred, starText, unstarText } = this.props
    return (
      <div className={ this._getClass() } onClick={ this._handleClick } title={ this._getTitle() }>
        <div className="maha-star-icon">
          <i className={`fa fa-fw fa-${this._getIcon()}`} />
        </div>
        { !is_starred && starText &&
          <span className="maha-star-text">{ starText }</span>
        }
        { is_starred && unstarText &&
          <span className="maha-star-text">{ unstarText }</span>
        }
      </div>
    )
  }

  _getClass() {
    const { starText } = this.props
    const classes = ['maha-star']
    if(starText) classes.push('labeled')
    return classes.join(' ')
  }

  _getTitle() {
    const { is_starred, label } = this.props
    const verb = is_starred ? 'Unstar' : 'Star'
    return `${verb} this ${label}`
  }

  _getIcon() {
    const { is_starred } = this.props
    return is_starred ? 'star' : 'star-o'
  }

  _handleClick(e) {
    this._handleToggle()
    e.stopPropagation()
  }

  _handleToggle(e) {
    const { is_starred, table, id, onStar, onUnstar } = this.props
    if(!is_starred) onStar(table, id)
    if(is_starred) onUnstar(table, id)
    this.context.network.request({
      method: 'patch',
      endpoint: `/api/admin/${table}/${id}/star`,
      onFailure: (result) => {},
      onSuccess: (result) => {}
    })
  }

}

const mapStateToProps = (state, props) => ({
  is_starred: is_starred(state, props)
})

export default connect(mapStateToProps, actions)(Star)
