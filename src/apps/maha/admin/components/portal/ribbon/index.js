import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Avatar from '../../avatar'
import Badge from '../badge'
import React from 'react'
import _ from 'lodash'

class Ribbon extends React.Component {

  static contextTypes = {
    modal: PropTypes.object
  }

  static propTypes = {
    apps: PropTypes.array,
    active: PropTypes.number,
    badges: PropTypes.array,
    user: PropTypes.object,
    onChoose: PropTypes.func,
    onHelp: PropTypes.func,
    onSetMode: PropTypes.func
  }

  _handleHelp = this._handleHelp.bind(this)

  render() {
    const { badges, user } = this.props
    return (
      <div className="maha-ribbon">
        <div className="maha-ribbon-item" onClick={ this._handleMode.bind(this, 'navigation') }>
          <i className="fa fa-fw fa-bars" />
        </div>
        <div className="maha-ribbon-spacer" />
        { badges.slice().reverse().map((item, i) => {
          const index = badges.length - i - 1
          if(item.app !== 'maha' && !this._getAccess(item.app)) return null
          return (
            <div className={ this._getClass(index) } key={`badge_${index}`} onClick={ this._handleChoose.bind(this, index) }>
              { item.component ? <item.component /> : <Badge { ...item } /> }
            </div>
          )
        })}
        <div className="maha-ribbon-item" onClick={ this._handleHelp }>
          <div className="maha-badge">
            <i className="fa fa-fw fa-question-circle" />
          </div>
        </div>
        <div className="maha-ribbon-item" onClick={ this._handleMode.bind(this, 'account') }>
          <div className="maha-badge">
            <Avatar user={ user } width={ 28 } presence={ false } />
          </div>
        </div>
      </div>
    )
  }

  _getClass(index) {
    const { active } = this.props
    const classes = ['maha-ribbon-item']
    if(index === active) classes.push('active')
    return classes.join(' ')
  }

  _getHelp() {
    return {
    }
  }

  _getAccess(code) {
    return (_.findIndex(this.props.apps, { code }) >= 0)
  }

  _handleChoose(index) {
    this.props.onChoose(index)
  }

  _handleMode(mode) {
    this.props.onSetMode(mode)
  }

  _handleHelp() {
    this.props.onHelp()
  }

}

const mapStateToProps = (state, props) => ({
  apps: state.maha.admin.apps,
  user: state.maha.admin.user
})

export default connect(mapStateToProps)(Ribbon)
