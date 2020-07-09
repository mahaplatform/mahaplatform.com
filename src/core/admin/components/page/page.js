import { CSSTransition } from 'react-transition-group'
import ModalPanel from '../modal_panel'
import Collection from '../collection'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Message from '../message'
import Button from '../button'
import Panel from '../panel'
import Error from '../error'
import Tabs from '../tabs'
import React from 'react'
import _ from 'lodash'

class Page extends React.Component {

  static contextTypes = {
    admin: PropTypes.object,
    configuration: PropTypes.object,
    host: PropTypes.object,
    logger: PropTypes.object,
    modal: PropTypes.object,
    network: PropTypes.object,
    router: PropTypes.object,
    tasks: PropTypes.object
  }

  static propTypes = {
    alert: PropTypes.any,
    access: PropTypes.func,
    active: PropTypes.bool,
    buttons: PropTypes.array,
    cacheKey: PropTypes.string,
    children: PropTypes.any,
    component: PropTypes.any,
    collection: PropTypes.object,
    color: PropTypes.string,
    data: PropTypes.object,
    message: PropTypes.object,
    panel: PropTypes.object,
    page: PropTypes.object,
    rights: PropTypes.array,
    sidebar: PropTypes.any,
    tabs: PropTypes.object,
    task: PropTypes.object,
    tasks: PropTypes.object,
    title: PropTypes.string,
    team: PropTypes.object,
    user: PropTypes.object
  }

  static defaultProps = {
    color: 'red'
  }

  state = {
    access: null
  }

  _handleBack = this._handleBack.bind(this)
  _handleTask = this._handleTask.bind(this)
  _handleTasks = this._handleTasks.bind(this)
  _handleUpdateTitle = this._handleUpdateTitle.bind(this)

  render() {
    const { access } = this.state
    const { alert, buttons, collection, message, panel, sidebar, tabs } = this.props
    const Component = this.props.component
    if(access === null) return null
    if(!access) return this.renderForbidden()
    return (
      <ModalPanel { ...this._getPanel() }>
        <Error>
          <div className="maha-page">
            <div className="maha-page-main">
              { sidebar &&
                <div className="maha-page-sidebar">
                  { _.isFunction(sidebar) ? React.createElement(sidebar) : sidebar }
                </div>
              }
              <div className="maha-page-body">
                { Component && <Component { ...this._getComponent() } /> }
                { collection && <Collection { ...this._getCollection() } /> }
                { message && <Message { ...message } /> }
                { tabs && <Tabs { ...tabs } /> }
                { panel && <Panel { ...panel } /> }
                { this.props.children }
              </div>
            </div>
            { alert &&
              <div className="maha-page-alert">
                { alert }
              </div>
            }
          </div>
          <CSSTransition in={ !_.isNil(buttons) } classNames="expanded" timeout={ 150 } mountOnEnter={ true } unmountOnExit={ true }>
            <div className="maha-page-footer">
              <div className="maha-page-footer-items">
                { buttons && buttons.map((button, index) => (
                  <div key={`pager_footer_${index}`} className="maha-page-footer-item">
                    <Button { ...button } />
                  </div>
                )) }
              </div>
            </div>
          </CSSTransition>
        </Error>
      </ModalPanel>
    )
  }

  renderForbidden() {
    return (
      <ModalPanel { ...this._getForbiddenPanel() }>
        <Message { ...this._getForbidden() } />
      </ModalPanel>
    )
  }

  componentDidMount() {
    const { title } = this.props
    this._handleCheckAccess()
    this._handleUpdateTitle(title)
  }

  componentDidUpdate(prevProps) {
    const { active, title } = this.props
    if(active !== prevProps.active && active) {
      this._handleUpdateTitle(title)
    }
  }

  componentWillUnmount() {
    this._handleUpdateTitle(null)
  }

  _handleUpdateTitle(title) {
    this.context.host.setTitle(title)
  }

  _getAccess(options) {
    const { access, rights, team, user } = this.props
    if(rights) return this._getUserHasRights(rights, rights)
    if(access) return access(user, team.token).then(result => !result)
    return true
  }

  _getComponent() {
    const { data, page } = this.props
    return {
      ...this.props,
      page,
      ...data
    }
  }

  _getCollection() {
    const { cacheKey, collection, team } = this.props
    return {
      cacheKey,
      token: team.token,
      ...collection
    }
  }

  _getForbiddenPanel() {
    return {
      leftItems: [
        { icon: 'chevron-left', handler: this._handleBack }
      ],
      title: 'Forbidden'
    }
  }

  _getForbidden() {
    return {
      icon: 'exclamation-triangle',
      title: 'Forbidden',
      text: 'You do not have permission to access this content'
    }
  }

  _getPanel() {
    const { color, task, tasks, title } = this.props
    if(!title) return { showHeader: false }
    const panel = {
      leftItems: [
        { icon: 'chevron-left', handler: this._handleBack }
      ],
      color,
      title
    }
    if(tasks && tasks.items && tasks.items.filter(task => task.show !== false).length > 0) {
      panel.rightItems = [
        { icon: tasks.icon || 'ellipsis-v', handler: this._handleTasks }
      ]
    }
    if(task) {
      panel.rightItems = [
        { icon: task.icon || 'plus', handler: this._handleTask }
      ]
    }
    return panel
  }

  _getUserHasRights(expected) {
    const { admin } = this.context
    if(!expected) return true
    return expected.reduce((permit, right) => {
      return (!_.includes(admin.rights, right)) ? false : permit
    }, true)
  }

  _handleBack() {
    this.context.router.history.goBack()
  }

  _handleCheckAccess() {
    const access = this._getAccess()
    this.setState({ access })
  }

  _handleTasks() {
    const { tasks } = this.props
    this.context.tasks.open({
      items: tasks.items
    })
  }

  _handleTask() {
    const { task } = this.props
    const { router, modal, tasks } = this.context
    if(task.route) {
      router.history.push(task.route)
    } else if(task.modal) {
      modal.open(task.modal)
    } else if(task.handler){
      task.handler()
    }
    tasks.close()
  }

}

const mapStateToProps = (state, props) => ({
  team: state.maha.admin.team,
  user: state.maha.admin.user
})

export default connect(mapStateToProps)(Page)
