import Platform from './components/platform'
import NotFound from './views/not_found'
import Root from './components/root'
import PropTypes from 'prop-types'
import React from 'react'

class Admin extends React.Component {

  static childContextTypes = {
    configuration: PropTypes.object
  }

  static propTypes = {
    appBadges: PropTypes.array,
    appReducers: PropTypes.array,
    appRoutes: PropTypes.array,
    appRoots: PropTypes.array,
    appUserFields: PropTypes.array,
    appUserTasks: PropTypes.array,
    appUserValues: PropTypes.array,
    settings: PropTypes.object,
    routes: PropTypes.array
  }

  render() {
    const { appReducers } = this.props
    return (
      <Root reducers={ appReducers }>
        <Platform { ...this._getPlatform() } />
      </Root>
    )
  }

  getChildContext() {
    const { appUserTasks, appUserFields, appUserValues, settings } = this.props
    return {
      configuration: {
        appUserTasks,
        appUserFields,
        appUserValues,
        settings
      }
    }
  }

  _getPlatform() {
    const { appBadges, appRoots } = this.props
    return {
      badges: appBadges,
      roots: appRoots,
      routes: [
        ...this.props.appRoutes,
        { path: '/*', component: NotFound }
      ]
    }
  }

}

export default Admin
