import PropTypes from 'prop-types'
import React from 'react'
import _ from 'lodash'

class AdminRouter extends React.Component {

  static childContextTypes = {
    router: PropTypes.object
  }

  static contextTypes = {
    admin: PropTypes.object,
    router: PropTypes.object
  }

  static propTypes = {
    apps: PropTypes.array,
    team: PropTypes.object,
    teams: PropTypes.array,
    children: PropTypes.any
  }

  _handleGoBack = this._handleGoBack.bind(this)
  _handlePush = this._handlePush.bind(this)
  _handleReplace = this._handleReplace.bind(this)

  render() {
    return this.props.children
  }


  getChildContext() {
    const { router } = this.context
    return {
      router: {
        location: router.location,
        history: {
          goBack: this._handleGoBack,
          push: this._handlePush,
          replace: this._handleReplace
        }
      }
    }
  }

  _getRoute(path) {
    if(!_.isString(path)) return path
    const route = new URL(`http://localhost${path}`)
    return {
      pathname: route.pathname,
      search: route.search,
      hash: route.hash
    }
  }

  _getTeamPathname(pathname) {
    const { apps, teams, team } = this.props
    const fullpath = pathname.replace(/\/admin/, '')
    if(_.includes(['/signin','/reset','/activate'], fullpath)) return fullpath
    if(_.includes(['','/'], fullpath)) return team ? `/${team.subdomain}` : '/'
    const [,subdomain] = fullpath.match(/\/([^/]*).*/)
    const targetTeam = teams.find(team => {
      return team.subdomain === subdomain
    })
    const targetApp = apps.find(app => {
      return app.path === `/${subdomain}`
    })
    if(!targetTeam && targetApp) {
      return `/${team.subdomain}${fullpath}`
    } else if(!targetTeam && !targetApp) {
      return '/forbidden'
    } else if(targetTeam.subdomain !== team.subdomain) {
      this.context.admin.chooseTeam(targetTeam.id, fullpath)
    } else {
      return pathname
    }
  }

  _getTeamRoute(path) {
    const route = this._getRoute(path)
    return {
      ...route,
      pathname: this._getTeamPathname(route.pathname),
      search: route.search,
      hash: route.hash
    }
  }

  _handleGoBack() {
    this.context.router.history.goBack()
  }

  _handleReplace(path) {
    const route = this._getTeamRoute(path)
    this.context.router.history.replace(route)
  }

  _handlePush(path) {
    const route = this._getTeamRoute(path)
    this.context.router.history.push(route)
  }

}

export default AdminRouter
