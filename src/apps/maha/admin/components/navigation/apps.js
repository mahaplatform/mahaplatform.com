import { TransitionGroup, CSSTransition } from 'react-transition-group'
import PropTypes from 'prop-types'
import { Logo } from '@admin'
import React from 'react'
import _ from 'lodash'

class Apps extends React.Component {

  static contextTypes = {
    modal: PropTypes.object,
    router: PropTypes.object
  }

  static propTypes = {
    items: PropTypes.array,
    path: PropTypes.array,
    rights: PropTypes.array,
    state: PropTypes.string,
    team: PropTypes.object,
    title: PropTypes.string,
    onBack: PropTypes.func,
    onDone: PropTypes.func,
    onForward: PropTypes.func,
    onToggleMode: PropTypes.func
  }

  _handleBack = this._handleBack.bind(this)
  _handleToggleMode = this._handleToggleMode.bind(this)
  _handleForward = _.debounce(this._handleForward.bind(this), 300, { leading: true })

  render() {
    const { path, team } = this.props
    const { items, label } = this._getItems(this.props.items, path)
    return (
      <TransitionGroup>
        <CSSTransition classNames="expanded" timeout={ 300 } mountOnEnter={ true } unmountOnExit={ true } key={`navigation-${path.join('-')}`}>
          <div className="maha-navigation-panel">
            { path.length === 0 ?
              <div className="maha-navigation-header" onClick={ this._handleToggleMode }>
                <div className="maha-navigation-header-back">
                  <Logo team={ team } width="32" />
                </div>
                <div className="maha-navigation-header-team">
                  { team.title }
                </div>
                <div className="maha-navigation-header-next">
                  <i className="fa fa-chevron-up" />
                </div>
              </div> :
              <div className="maha-navigation-header" onClick={ this._handleBack }>
                <div className="maha-navigation-header-back">
                  <i className="fa fa-chevron-left" />
                </div>
                <div className="maha-navigation-header-title">
                  { label }
                </div>
                <div className="maha-navigation-header-next" />
              </div>
            }
            <div className="maha-navigation-body">
              { items.map((item, index) => (
                <div key={`item_${index}`} className={ this._getClass(item) } onClick={ this._handleForward.bind(this, item, index)}>
                  { item.icon &&
                    <div className="maha-navigation-item-extra">
                      <div className="maha-navigation-item-icon">
                        <i className={`fa fa-${item.icon}`} />
                      </div>
                    </div>
                  }
                  <div className="maha-navigation-item-details">
                    { item.label }
                  </div>
                  <div className="maha-navigation-item-extra">
                    { item.items && item.items.length > 0 && <i className="fa fa-chevron-right" /> }
                  </div>
                </div>
              )) }
            </div>
          </div>
        </CSSTransition>
      </TransitionGroup>
    )
  }

  _getClass(item) {
    const classes = ['maha-navigation-item']
    if(item.color) classes.push(item.color)
    return classes.join(' ')
  }

  _getItems(items, path) {
    return path.reduce((items, index) => items.items[index], { items })
  }

  _handleForward(item, index) {
    const { router } = this.context
    const { onDone, onForward } = this.props
    if(item.items && item.items.length > 0) {
      onForward(index)
    } else if(item.route) {
      onDone()
      router.history.push(item.route)
    }
  }

  _handleBack() {
    this.props.onBack()
  }

  _handleToggleMode() {
    this.props.onToggleMode()
  }

}

export default Apps
