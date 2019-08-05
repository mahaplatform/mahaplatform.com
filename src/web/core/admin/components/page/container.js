import Loader from '../loader'
import Message from '../message'
import ModalPanel from '../modal_panel'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import React from 'react'
import Page from './page'
import _ from 'lodash'

const PageCreator = (mapResourcesToPage, mapPropsToPage) => {

  class PageContainer extends React.Component {

    static contextTypes = {
      alert: PropTypes.object,
      admin: PropTypes.object,
      configuration: PropTypes.object,
      confirm: PropTypes.object,
      flash: PropTypes.object,
      host: PropTypes.object,
      modal: PropTypes.object,
      network: PropTypes.object,
      prompt: PropTypes.object,
      router: PropTypes.object,
      tasks: PropTypes.object
    }

    static propTypes = {
      active: PropTypes.bool,
      component: PropTypes.object,
      data: PropTypes.object,
      params: PropTypes.object,
      pathname: PropTypes.string,
      resources: PropTypes.object,
      status: PropTypes.string,
      onFetchResource: PropTypes.func,
      onReady: PropTypes.func
    }

    state = {
      access: true,
      cacheKey: null
    }

    _handleBack = this._handleBack.bind(this)
    _handleFetchResources = this._handleFetchResources.bind(this)
    _handleInit = this._handleInit.bind(this)
    _handleReady = this._handleReady.bind(this)
    _handleRefreshResources = this._handleRefreshResources.bind(this)

    render() {
      const { status } = this.props
      if(!_.includes(['pending','loading','failure','forbidden'], status)) {
        return <Page { ...this._getPage() } />
      }
      return (
        <ModalPanel { ...this._getPanel() }>
          { _.includes(['pending','loading'], status) && <Loader /> }
          { status === 'failure' && <Message { ...this._getFailure() } /> }
          { status === 'forbidden' && <Message { ...this._getForbidden() } /> }
        </ModalPanel>
      )
    }

    componentDidMount() {
      setTimeout(this._handleInit, 500)
    }

    componentWillUnmount() {
      this._handleLeave()
    }

    _getPanel() {
      return {
        leftItems: [
          { icon: 'chevron-left', handler: this._handleBack }
        ],
        title: ''
      }
    }

    _getFailure() {
      return {
        icon: 'exclamation-triangle',
        title: 'Unable to load this page',
        button: {
          label: 'Try again',
          handler: this._handleFetchResources
        }
      }
    }

    _getForbidden() {
      return {
        icon: 'exclamation-triangle',
        title: 'You do not have permission to access this content'
      }
    }

    _getPage() {
      const { cacheKey } = this.state
      const { active, data, params, pathname } = this.props
      const page = { params, pathname }
      const pageProps = mapPropsToPage(this.props, this.context, data, page)
      return {
        ...pageProps,
        active,
        cacheKey,
        data,
        page
      }
    }

    _handleBack() {
      this.context.router.history.goBack()
    }

    _handleFetchResources() {
      const { params, pathname, onFetchResource } = this.props
      const page = { params, pathname }
      if(!mapResourcesToPage) return
      const resources = mapResourcesToPage(this.props, this.context, page)
      Object.keys(resources).map(prop => onFetchResource(prop, resources[prop]))
    }

    _handleInit() {
      this._handleJoin()
      if(!mapResourcesToPage) return this._handleReady()
      this._handleFetchResources()
    }

    _handleJoin() {
      const { pathname } = this.props
      const { network } = this.context
      network.join(pathname)
      network.subscribe([
        { target: pathname, action: 'refresh', handler: this._handleRefreshResources }
      ])
    }

    _handleLeave() {
      const { pathname } = this.props
      const { network } = this.context
      network.leave(pathname)
      network.unsubscribe([
        { target: pathname, action: 'refresh', handler: this._handleRefreshResources }
      ])
    }

    _handleRefreshResources() {
      this.setState({ cacheKey: _.random(100000, 999999).toString(36) })
      this._handleFetchResources()
    }

    _handleReady() {
      this.props.onReady()
    }

  }

  const mapStateToProps = (state, props) => ({
    rights: state.maha.admin.rights,
    team: state.maha.admin.team,
    user: state.maha.admin.user
  })

  return connect(mapStateToProps)(PageContainer)

}

export default PageCreator
