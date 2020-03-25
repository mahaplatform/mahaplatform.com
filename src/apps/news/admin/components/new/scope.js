import { ModalPanel } from 'maha-admin'
import PropTypes from 'prop-types'
import Group from './group'
import React from 'react'
import User from './user'

class Scope extends React.Component {

  static contextTypes = {
    admin: PropTypes.object
  }

  static propTypes = {
    records: PropTypes.array,
    onBack: PropTypes.func,
    onChoose: PropTypes.func,
    onPush: PropTypes.func
  }

  _handleBack = this._handleBack.bind(this)

  render() {
    const scopes = [
      { icon: 'globe', title: 'News Feed' },
      { icon: 'users', title: 'Group Timeline', component: Group },
      { icon: 'user', title: 'User Timeline', component: User }
    ]
    return (
      <ModalPanel { ...this._getPanel() }>
        <div className="news-form-list">
          { scopes.map((scope, index) => (
            <div className="news-form-list-item" key={`scope_${index}`} onClick={ this._handleClick.bind(this, scope) }>
              <div className="news-form-list-item-icon">
                <i className={`fa fa-${scope.icon}`} />
              </div>
              <div className="news-form-list-item-label">
                { scope.title }
              </div>
              { scope.component &&
                <div className="news-form-list-item-proceed">
                  <i className="fa fa-chevron-right" />
                </div>
              }
            </div>
          )) }
        </div>
      </ModalPanel>
    )
  }

  _getPanel() {
    return {
      title: 'Share To',
      leftItems: [
        { icon: 'chevron-left', handler: this._handleBack }
      ]
    }
  }

  _getScope() {
    const { onBack, onChoose, onPush } = this.props
    return {
      onBack,
      onChoose,
      onPush
    }
  }

  _handleBack() {
    this.props.onBack()
  }

  _handleChoose(group) {
    const value = group ? {
      id: group.id,
      title: group.title,
      icon: 'users'
    } : null
    this.props.onChoose(value)
  }

  _handleClick(scope) {
    if(scope.component) {
      this.props.onPush(scope.component, this._getScope(scope))
    }
  }

}

export default Scope
