import HTML5Backend from 'react-dnd-html5-backend'
import { BrowserRouter } from 'react-router-dom'
import Notifications from '../notifications'
import { DndProvider } from 'react-dnd'
import { connect } from 'react-redux'
import { routes } from './selectors'
import Analytics from '../analytics'
import Presence from '../presence'
import PropTypes from 'prop-types'
import { Flash } from 'maha-admin'
import Sessions from '../sessions'
import Network from '../network'
import Device from '../device'
import Logger from '../logger'
import Router from '../router'
import Admin from '../admin'
import Push from '../push'
import React from 'react'

class Platform extends React.Component {

  static propTypes = {
    badges: PropTypes.array,
    roots: PropTypes.array,
    routes: PropTypes.object
  }

  render() {
    return (
      <DndProvider backend={ HTML5Backend } >

        <div className="maha-platform">
          <Analytics>
            <Logger>
              <BrowserRouter>
                <Router>
                  <Network>
                    <Device>
                      <Push>
                        <Notifications>
                          <Flash>
                            <Admin>
                              <Presence>
                                <Sessions { ...this._getSessions() } />
                              </Presence>
                            </Admin>
                          </Flash>
                        </Notifications>
                      </Push>
                    </Device>
                  </Network>
                </Router>
              </BrowserRouter>
            </Logger>
          </Analytics>
        </div>
      </DndProvider>
    )
  }

  _getSessions() {
    const { badges, roots, routes } = this.props
    return {
      badges,
      roots,
      routes
    }
  }

}

const mapStateToProps = (state, props) => ({
  routes: routes(state, props)
})

Platform = connect(mapStateToProps)(Platform)

export default Platform
